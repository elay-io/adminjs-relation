import { RecordJSON, ResourceJSON, ListActionResponse } from 'adminjs';

type UseRelationRecordsProps = {
    relation: string;
    record: RecordJSON;
    resource: ResourceJSON;
    targetResourceId: string;
    tab: string;
};
declare const useRelationRecords: ({ record, resource, targetResourceId, tab }: UseRelationRecordsProps) => {
    data: ListActionResponse | undefined;
    isLoading: boolean;
};

export { useRelationRecords };
