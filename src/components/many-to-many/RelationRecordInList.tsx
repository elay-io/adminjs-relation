import { Placeholder, TableCell, TableRow } from "@adminjs/design-system";
import { BasePropertyComponent, BasePropertyJSON, RecordJSON, ResourceJSON } from "adminjs";
import React from "react";
import { RelationRecordInListActions } from "./RelationRecordInListActions";
import allowOverride from '@/components/shared/allow-override';
type Props = {
    resource: ResourceJSON;
    record: RecordJSON;
    isLoading?: boolean;
};

const RelationRecordInList: React.FC<Props> = ({
    resource,
    record,
    isLoading
}) => {
    const renderPropertyCell = (property: BasePropertyJSON) => (
        <TableCell
            style={{ cursor: "pointer", whiteSpace: "nowrap" }}
            key={property.propertyPath}
            data-property-name={property.propertyPath}
            display="table-cell"
            data-css={[resource.id, property.name, "cell"].join("-")}
        >
            {isLoading ? (
                <Placeholder style={{ height: 14 }} />
            ) : (
                <BasePropertyComponent
                    key={property.propertyPath}
                    where="list"
                    property={property}
                    resource={resource}
                    record={record}
                />
            )}
        </TableCell>
    );

    const renderActionsCell = () => (
        <TableCell key="options" className="options">
            {isLoading ? (
                <Placeholder style={{ height: 14 }} />
            ) : (
                <RelationRecordInListActions
                    record={record}
                    resource={resource}
                />
            )}
        </TableCell>
    );

    return (
        <TableRow
            data-id={record.id}
            data-css={[resource.id, "row"].join("-")}
        >
            <TableCell width={0} />
            {resource.listProperties.map(renderPropertyCell)}
            {renderActionsCell()}
        </TableRow>
    );
};

const OverridableRelationRecordInList = allowOverride(RelationRecordInList, 'RelationRecordInList')
export {
    OverridableRelationRecordInList as default,
    OverridableRelationRecordInList as RelationRecordInList,
    RelationRecordInList as OriginalRelationRecordInList,
}
