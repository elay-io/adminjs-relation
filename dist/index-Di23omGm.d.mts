import { ComponentLoader, ActionResponse, RecordJSON, BaseResource } from 'adminjs';

declare const Messages: {
    MissingConfiguration: string;
    MissingRecordId: string;
    InvalidRelationType: string;
    JoinKeyMissing: string;
    NoRelationRecordsTitle: string;
    NoRelationRecords: string;
    JunctionMissing: string;
    JunctionResourceIdMissing: string;
    JunctionResourceMissing: string;
    ChooseItemSubtitle: string;
    ManyToManyRelationAlreadyExists: string;
    RelationSuccessfullyAdded: string;
    RelationSuccessfullyDeleted: string;
    QueryParamsMissing: string;
    JunctionRecordMissing: string;
};
declare const Labels: {
    ChooseItemHeader: string;
    DeleteRelationHeader: string;
};
declare const Actions: {
    AddItem: string;
    RemoveRelation: string;
    RemoveRecord: string;
};
declare enum RelationType {
    OneToMany = "one-to-many",
    ManyToMany = "many-to-many"
}

type RelationsFeatureConfig = {
    componentLoader: ComponentLoader;
    licenseKey: string;
    relations: RelationsFeatureOptions;
    propertyKey?: string;
};
interface BaseRelationOptions {
    type: RelationType;
}
interface OneToManyRelationOptions extends BaseRelationOptions {
    type: RelationType.OneToMany;
    target: {
        resourceId: string;
        joinKey: string;
    };
}
interface ManyToManyRelationOptions extends BaseRelationOptions {
    type: RelationType.ManyToMany;
    junction: {
        joinKey: string;
        inverseJoinKey: string;
        throughResourceId: string;
    };
    target: {
        resourceId: string;
    };
    /**
     * Override default delete options.
     */
    deleteOptions?: {
        /**
         * Whether user can delete a relation (record in junction table)
         */
        enableDeleteRelation: boolean;
        /**
         * Whether user can delete related record (target record).
         * If target record's delete action is disabled, you won't be able to delete the record even if this option is set to true.
         */
        enableDeleteRelatedRecord: boolean;
    };
}
type RelationOptions = OneToManyRelationOptions | ManyToManyRelationOptions;
type RelationsFeatureOptions<T = RelationOptions> = {
    [resourceId: string]: T;
};
type RelationsActionResponse = ActionResponse & {
    /**
     * List of relation records
     */
    records: Array<RecordJSON>;
};
interface RelationLoaderHandlerConfig<T = RelationOptions> {
    relation: T;
    targetResource: BaseResource;
    ownerResource: BaseResource;
}

export { Actions as A, type BaseRelationOptions as B, Labels as L, type ManyToManyRelationOptions as M, type OneToManyRelationOptions as O, type RelationsFeatureConfig as R, type RelationsActionResponse as a, type RelationsFeatureOptions as b, type RelationLoaderHandlerConfig as c, Messages as d, type RelationOptions as e, RelationType as f };
