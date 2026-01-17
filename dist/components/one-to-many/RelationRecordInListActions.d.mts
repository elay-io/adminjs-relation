import { RecordJSON, ResourceJSON } from 'adminjs';
import React from 'react';

type Props = {
    record: RecordJSON;
    resource: ResourceJSON;
};
declare const RelationRecordInListActions: React.FC<Props>;
declare const OverridableRelationRecordInListActions: React.ComponentType<Props & {
    OriginalComponent?: React.ComponentType<Props> | undefined;
}>;

export { RelationRecordInListActions as OriginalRelationRecordInListActions, OverridableRelationRecordInListActions as RelationRecordInListActions, OverridableRelationRecordInListActions as default };
