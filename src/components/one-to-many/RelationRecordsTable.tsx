import { Box, Table, TableBody } from "@adminjs/design-system";
import { ListActionResponse, RecordsTableHeader, ResourceJSON, useQueryParams } from "adminjs";
import React from "react";
import { useRelationConfig } from "../../providers/RelationConfigProvider";
import { RelationNoRecords } from "./RelationNoRecords";
import { RelationRecordInList } from "./RelationRecordInList";

type Props = {
    targetResource: ResourceJSON;
    records: ListActionResponse['records'];
    isLoading: boolean;
};
export const RelationRecordsTable: React.FC<Props> = ({
    targetResource,
    records,
    isLoading
}) => {
    const { ownerResource } = useRelationConfig();
    const { direction, sortBy } = useQueryParams();

    if (!records.length && !isLoading) {
        return <RelationNoRecords resource={targetResource} />;
    }

    // Filter out properties that reference the owner resource to avoid circular references
    const filteredResource = {
        ...targetResource,
        listProperties: targetResource.listProperties.filter(
            ({ reference }) => reference !== ownerResource.id
        )
    };

    return (
        <Box overflow="auto">
            <Table data-css="relations-table">
                <RecordsTableHeader
                    properties={filteredResource.listProperties}
                    titleProperty={filteredResource.titleProperty}
                    direction={direction}
                    sortBy={sortBy}
                />
                <TableBody data-css="relations-table-body">
                    {records.map(record => (
                        <RelationRecordInList
                            key={record.id}
                            record={record}
                            resource={filteredResource}
                            isLoading={isLoading}
                        />
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};