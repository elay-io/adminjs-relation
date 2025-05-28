import { ApiClient, useNotice, useQueryParams } from "adminjs";
import { useEffect, useState } from "react";
import { useRelationConfig } from "../providers/RelationConfigProvider.js";

const apiClient = new ApiClient();

export const useRelationRecords = ({
    record,
    resource,
    targetResourceId,
    tab
}) => {
    const { relation, refreshToken } = useRelationConfig();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const {
        direction,
        sortBy,
        page,
        parsedQuery
    } = useQueryParams();
    const addNotice = useNotice();

    useEffect(() => {
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