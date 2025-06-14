import { ApiClient, useNotice, useQueryParams } from "adminjs";
import { useRelationConfig } from "../providers/RelationConfigProvider";
import React from "react";
import { type ListActionResponse, RecordJSON, ResourceJSON } from 'adminjs';
type UseRelationRecordsProps = {
    relation: string;
    record: RecordJSON;
    resource: ResourceJSON;
    targetResourceId: string;
    tab: string;
};

const apiClient = new ApiClient();

export const useRelationRecords = ({
    record,
    resource,
    targetResourceId,
    tab
}: UseRelationRecordsProps) => {
    const { relation, refreshToken } = useRelationConfig();
    const [data, setData] = React.useState<ListActionResponse>();
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const {
        direction,
        sortBy,
        page,
        parsedQuery
    } = useQueryParams();
    const addNotice = useNotice();

    React.useEffect(() => {
        const fetchRelationRecords = async () => {
            if (tab !== relation || !record) {
                return;
            }

            setIsLoading(true);

            try {
                const { data: { records, meta, notice } } = await apiClient.recordAction({
                    actionName: "findRelation",
                    recordId: record.id,
                    resourceId: resource.id,
                    params: {
                        relation,
                        direction,
                        sortBy,
                        page
                    }
                });

                if (notice) {
                    addNotice(notice);
                }

                setData({ records, meta });
            } catch (error) {
                // Handle error if needed
                console.error("Error fetching relation records:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRelationRecords();
    }, [
        tab,
        relation,
        record,
        resource.id,
        targetResourceId,
        direction,
        sortBy,
        page,
        parsedQuery,
        refreshToken
    ]);

    return { data, isLoading };
};