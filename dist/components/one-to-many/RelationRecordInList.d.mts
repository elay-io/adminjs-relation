import { ResourceJSON, RecordJSON } from 'adminjs';
import React from 'react';

type Props = {
    resource: ResourceJSON;
    record: RecordJSON;
    isLoading?: boolean;
};
declare const RelationRecordInList: React.FC<Props>;
declare const OverridableRelationRecordInList: React.ComponentType<Props & {
    OriginalComponent?: React.ComponentType<Props> | undefined;
}>;

export { RelationRecordInList as OriginalRelationRecordInList, OverridableRelationRecordInList as RelationRecordInList, OverridableRelationRecordInList as default };
