import { ResourceJSON, ListActionResponse } from 'adminjs';
import React from 'react';

type Props = {
    targetResource: ResourceJSON;
    records: ListActionResponse['records'];
    isLoading: boolean;
};
declare const RelationRecordsTable: React.FC<Props>;
declare const OverridableRelationRecordsTable: React.ComponentType<Props & {
    OriginalComponent?: React.ComponentType<Props> | undefined;
}>;

export { RelationRecordsTable as OriginalRelationRecordsTable, OverridableRelationRecordsTable as RelationRecordsTable, OverridableRelationRecordsTable as default };
