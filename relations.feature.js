import { buildFeature } from "adminjs";
import merge from "lodash/merge.js";
import {
  LicenseStatusEnum,
  verifyLicense,
  trackLicenseUsage,
} from "@adminjs/license";
import {
  addManyToManyRelationHandler,
  findRelationHandler,
  redirectToOwningResourceDetails,
  deleteRelationHandler,
  assignManyToManyRelation,
} from "./actions/index.js";
import { emptyLocale, featureTranslations } from "./translations.js";
import { bundleComponent } from "./utils/index.js";

const PACKAGE_NAME = "@adminjs/relations";
let licenseInstance = null;

/**
 * Bundles all relation components for AdminJS
 * @param {object} componentLoader - The AdminJS component loader
 * @returns {object} Object containing bundled show, edit, and list components
 */
const bundleRelationsComponents = (componentLoader) => ({
  show: bundleComponent(componentLoader, "RelationsShowPropertyComponent"),
  edit: bundleComponent(componentLoader, "RelationsEditPropertyComponent"),
  list: bundleComponent(componentLoader, "RelationsListPropertyComponent"),
});

/**
 * Tracks license usage for the relations package
 * @param {string} licenseKey - The license key to track
 */
const trackUsage = (licenseKey) => {
  if (!licenseInstance) {
    licenseInstance = licenseKey;
    trackLicenseUsage(licenseInstance, PACKAGE_NAME);
  }
};

/**
 * Creates a feature for managing relations in the owning resource
 * @param {object} options - Configuration options
 * @param {object} options.componentLoader - AdminJS component loader
 * @param {object} options.relations - Relations configuration
 * @param {string} [options.propertyKey="relations"] - Key for the relations property
 * @param {string} options.licenseKey - License key for the feature
 * @returns {Function} AdminJS feature function
 *
 * @example
 * ```
 * export const createOrganizationResource = (): CreateResourceResult<typeof Organization> => ({
 *   resource: Organization,
 *   features: [
 *     owningRelationSettingsFeature({
 *       componentLoader,
 *       licenseKey: 'xxx',
 *       relations: {
 *         persons: {
 *           junction: {
 *             joinKey: 'personId',
 *             inverseJoinKey: 'organizationId',
 *             throughResourceId: 'PersonOrganization',
 *           },
 *           target: {
 *             resourceId: 'Person',
 *           },
 *         },
 *       },
 *     }),
 *   ],
 *   options: {
 *     navigation: { icon: 'Home' },
 *     actions: {
 *       findRelation: {
 *         isAccessible: true,
 *       },
 *     },
 *   },
 * });
 * ```
 */
export const owningRelationSettingsFeature = ({
  componentLoader,
  relations,
  propertyKey = "relations",
  licenseKey,
}) => {
  const position = Number.MAX_SAFE_INTEGER;
  const { show, edit, list } = bundleRelationsComponents(componentLoader);

  const { status, msg } = verifyLicense(licenseKey, {
    packageName: PACKAGE_NAME,
  });

  if (
    status === LicenseStatusEnum.Invalid ||
    status === LicenseStatusEnum.NotFound
  ) {
    throw new Error(msg);
  }

  trackUsage(licenseKey);

  return buildFeature((resource) => {
    resource.options.locale = merge(
      emptyLocale,
      featureTranslations,
      resource.options.locale
    );

    return {
      properties: {
        [propertyKey]: {
          isVisible: {
            show: true,
            edit: false,
            list: false,
          },
          type: "string",
          components: {
            show,
            edit,
            list,
          },
          props: {
            relations,
          },
          position,
        },
      },
      actions: {
        findRelation: {
          actionType: "record",
          isVisible: false,
          handler: findRelationHandler({ relations }),
        },
        addManyToManyRelation: {
          actionType: "record",
          isVisible: false,
          handler: addManyToManyRelationHandler({ relations }),
        },
        deleteRelation: {
          actionType: "record",
          isVisible: false,
          handler: deleteRelationHandler({ relations }),
        },
      },
    };
  });
};

/**
 * Creates a feature for managing relations in the target resource
 * @returns {Function} AdminJS feature function
 */
export const targetRelationSettingsFeature = () =>
  buildFeature({
    actions: {
      edit: {
        after: [redirectToOwningResourceDetails],
      },
      new: {
        after: [assignManyToManyRelation, redirectToOwningResourceDetails],
      },
    },
  });
