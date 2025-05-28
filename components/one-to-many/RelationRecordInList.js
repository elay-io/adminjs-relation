import { Placeholder, TableCell, TableRow } from "@adminjs/design-system";
import { BasePropertyComponent, ViewHelpers } from "adminjs";
import React from "react";
import { useNavigate } from "react-router";
import { RelationRecordInListActions } from "./RelationRecordInListActions.js";
import { useRedirectUrl } from "../shared/useRedirectUrl.js";

const viewHelpers = new ViewHelpers();

export const RelationRecordInList = ({
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