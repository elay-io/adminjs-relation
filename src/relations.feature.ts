import { buildFeature, ComponentLoader, FeatureType } from 'adminjs';
import merge from 'lodash/merge.js';
import { emptyLocale, featureTranslations } from './translations';
import { bundleComponent } from './utils/index';

import { redirectToOwningResourceDetails } from '@/actions/shared';
import { addManyToManyRelationHandler, assignManyToManyRelation, deleteRelationHandler } from '@/actions/many-to-many';
import { findRelationHandler } from '@/actions/relations.handler';
import { LicenseService } from '@/services/license-service';
import { RelationsFeatureConfig } from '@/global-types';

// Define Relation Type
export type RelationConfig = Record<
  string,
  {
    junction?: {
      joinKey: string;
      inverseJoinKey: string;
      throughResourceId: string;
    };
    target?: {
      resourceId: string;
    };
  }
>;

/**
 * Bundles all relation components for AdminJS
 * @param {object} componentLoader - The AdminJS component loader
 * @returns {object} Object containing bundled show, edit, and list components
 */
const bundleRelationsComponents = (componentLoader: ComponentLoader) => ({
  show: bundleComponent(componentLoader, 'RelationsShowPropertyComponent'),
  edit: bundleComponent(componentLoader, 'RelationsEditPropertyComponent'),
  list: bundleComponent(componentLoader, 'RelationsListPropertyComponent'),
});

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
  propertyKey = 'relations',
  licenseKey,
}: RelationsFeatureConfig): FeatureType => {
  const position = Number.MAX_SAFE_INTEGER;
  const { show, edit, list } = bundleRelationsComponents(componentLoader);

  const { status, msg } = LicenseService.verifyLicense(licenseKey);

  // if (status !== LicenseStatusEnum.Valid) {
  //   throw new Error(msg);
  // }

  // trackUsage(licenseKey);

  return buildFeature((resource) => {
    resource.options.locale = merge(emptyLocale, featureTranslations, resource.options.locale);

    return {
      properties: {
        [propertyKey]: {
          isVisible: {
            show: true,
            edit: false,
            list: false,
          },
          type: 'string',
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
          actionType: 'record',
          isVisible: false,
          handler: findRelationHandler({ relations } as any),
        },
        addManyToManyRelation: {
          actionType: 'record',
          isVisible: false,
          handler: addManyToManyRelationHandler({ relations } as any),
        },
        deleteRelation: {
          actionType: 'record',
          isVisible: false,
          handler: deleteRelationHandler({ relations } as any),
        },
      },
    };
  });
};

/**
 * Creates a feature for managing relations in the target resource
 * @returns {Function} AdminJS feature function
 */
export const targetRelationSettingsFeature = (): FeatureType =>
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
