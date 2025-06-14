import { Placeholder, TableCell, TableRow } from "@adminjs/design-system";
import { BasePropertyComponent, RecordJSON, ResourceJSON, ViewHelpers } from "adminjs";
import React from "react";
import { useNavigate } from "react-router";
import { RelationRecordInListActions } from "./RelationRecordInListActions";
import { useRedirectUrl } from "../shared/useRedirectUrl";
import allowOverride from "../shared/allow-override";

const viewHelpers = new ViewHelpers();

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
    const navigate = useNavigate();
    const redirectUrl = useRedirectUrl();

    const showAction = record.recordActions.find(
        ({ name }) => name === "show"
    );

    const handleRowClick = () => {
        if (showAction) {
            const actionUrl = viewHelpers.recordActionUrl({
                actionName: showAction.name,
                recordId: record.id,
                resourceId: resource.id,
                search: `?redirectUrl=${encodeURIComponent(redirectUrl)}`
            });
            navigate(actionUrl);
        }
    };

    return (
        <TableRow
            data-id={record.id}
            data-css={[resource.id, "row"].join("-")}
            onClick={handleRowClick}
        >
            <TableCell width={0} />
            {resource.listProperties.map(property => (
                <TableCell
                    style={{
                        cursor: showAction ? "pointer" : "initial",
                        whiteSpace: "nowrap"
                    }}
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
            ))}
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
        </TableRow>
    );
};


const OverridableRelationRecordInList = allowOverride(RelationRecordInList, 'RelationRecordInList')
export {
    OverridableRelationRecordInList as default,
    OverridableRelationRecordInList as RelationRecordInList,
    RelationRecordInList as OriginalRelationRecordInList,
}
