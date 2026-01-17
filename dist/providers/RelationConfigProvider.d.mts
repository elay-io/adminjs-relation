import { b as RelationsFeatureOptions } from '../index-Di23omGm.mjs';
import { RecordJSON, ResourceJSON } from 'adminjs';
import React, { PropsWithChildren } from 'react';

type RelationConfigProps = PropsWithChildren<{
    relation: string;
    ownerRecord: RecordJSON;
    ownerResource: ResourceJSON;
    relations: RelationsFeatureOptions;
}>;
type UseRelationConfigResult = Omit<RelationConfigProps, 'children'> & {
    refreshToken: number;
    refresh: () => void;
};
declare const RelationConfigProvider: React.FC<RelationConfigProps>;
declare const useRelationConfig: () => UseRelationConfigResult;
declare const OverridableRelationConfigProvider: React.ComponentType<{
    relation: string;
    ownerRecord: RecordJSON;
    ownerResource: ResourceJSON;
    relations: RelationsFeatureOptions;
} & {
    children?: React.ReactNode | undefined;
} & {
    OriginalComponent?: React.ComponentType<RelationConfigProps> | undefined;
}>;

export { RelationConfigProvider as OriginalRelationConfigProvider, OverridableRelationConfigProvider as RelationConfigProvider, OverridableRelationConfigProvider as default, useRelationConfig };
