import { ResourceJSON } from 'adminjs';
import React from 'react';

type Props = {
    resource: ResourceJSON;
};
declare const RelationNoRecords: React.FC<Props>;
declare const OverridableRelationNoRecords: React.ComponentType<Props & {
    OriginalComponent?: React.ComponentType<Props> | undefined;
}>;

export { RelationNoRecords as OriginalRelationNoRecords, OverridableRelationNoRecords as RelationNoRecords, OverridableRelationNoRecords as default };
