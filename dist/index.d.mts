import { FeatureType } from 'adminjs';
import { R as RelationsFeatureConfig, d as Messages, L as Labels, A as Actions } from './index-Di23omGm.mjs';
export { B as BaseRelationOptions, M as ManyToManyRelationOptions, O as OneToManyRelationOptions, c as RelationLoaderHandlerConfig, e as RelationOptions, f as RelationType, a as RelationsActionResponse, b as RelationsFeatureOptions } from './index-Di23omGm.mjs';
export { findRelationHandler } from './actions/relations.handler.mjs';
export { manyToManyHandler } from './actions/many-to-many/many-to-many.handler.mjs';
export { assignManyToManyRelation } from './actions/many-to-many/assign-many-to-many-relation.after.mjs';
export { deleteRelationHandler } from './actions/many-to-many/delete-relation.handler.mjs';
export { addManyToManyRelationHandler } from './actions/many-to-many/add-many-to-many-relation.handler.mjs';
export { oneToManyHandler } from './actions/one-to-many/one-to-many.handler.mjs';
export { redirectToOwningResourceDetails } from './actions/shared/redirect-to-owning-resource-details.after.mjs';
export { default as bundleComponent } from './utils/bundle-component.mjs';
export { useRelationRecords } from './hooks/useRelationRecords.mjs';

declare const PACKAGE_NAME = "@hero-truong/adminjs-relation";

type RelationConfig = Record<string, {
    junction?: {
        joinKey: string;
        inverseJoinKey: string;
        throughResourceId: string;
    };
    target?: {
        resourceId: string;
    };
}>;
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
declare const owningRelationSettingsFeature: ({ componentLoader, relations, propertyKey, licenseKey, }: RelationsFeatureConfig) => FeatureType;
/**
 * Creates a feature for managing relations in the target resource
 * @returns {Function} AdminJS feature function
 */
declare const targetRelationSettingsFeature: () => FeatureType;

/**
 * Combined translations for the relations feature
 */
declare const featureTranslations: {
    translations: {
        en: {
            messages: {
                [Messages.MissingConfiguration]: string;
                [Messages.MissingRecordId]: string;
                [Messages.InvalidRelationType]: string;
                [Messages.JoinKeyMissing]: string;
                [Messages.NoRelationRecordsTitle]: string;
                [Messages.NoRelationRecords]: string;
                [Messages.JunctionMissing]: string;
                [Messages.JunctionResourceIdMissing]: string;
                [Messages.JunctionResourceMissing]: string;
                [Messages.ChooseItemSubtitle]: string;
                [Messages.ManyToManyRelationAlreadyExists]: string;
                [Messages.RelationSuccessfullyAdded]: string;
                [Messages.RelationSuccessfullyDeleted]: string;
                [Messages.QueryParamsMissing]: string;
                [Messages.JunctionRecordMissing]: string;
            };
            labels: {
                [Labels.ChooseItemHeader]: string;
                [Labels.DeleteRelationHeader]: string;
            };
            actions: {
                [Actions.AddItem]: string;
                [Actions.RemoveRelation]: string;
                [Actions.RemoveRecord]: string;
            };
        };
    };
};
/**
 * Default empty locale configuration
 */
declare const emptyLocale: {
    language: string;
    translations: {};
};

export { Actions, Labels, Messages, PACKAGE_NAME, type RelationConfig, RelationsFeatureConfig, emptyLocale, featureTranslations, owningRelationSettingsFeature, targetRelationSettingsFeature };
