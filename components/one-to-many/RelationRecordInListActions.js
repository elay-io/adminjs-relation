import { Box, Button, Icon } from "@adminjs/design-system";
import { ActionButton } from "adminjs";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import { useRelationConfig } from "../../providers/RelationConfigProvider.js";
import { useRedirectUrl } from "../shared/useRedirectUrl.js";

const ACTION_ICONS = {
    show: "Eye",
    edit: "Edit2",
    delete: "Trash2"
};

export const RelationRecordInListActions = ({ record, resource }) => {
    const { recordActions, id: recordId } = record;
    const { id: resourceId } = resource;
    const { refresh } = useRelationConfig();
    
    const navigate = useNavigate();
    const redirectUrl = useRedirectUrl();
    const { pathname, search } = useLocation();

    const handleActionPerformed = ({ notice }) => {
        if (notice && notice.type === "success") {
            navigate({
                pathname,
                search
            });
            refresh();
        }
    };

    return (
        <Box flex justifyContent="end">
            {recordActions.map(action => (
                <ActionButton
                    key={action.name}
                    action={action}
                    resourceId={resourceId}
                    recordId={recordId}
                    actionPerformed={handleActionPerformed}
                    queryParams={{ redirectUrl }}
                >
                    <Button
                        size="icon"
                        rounded
                        color={action.variant}
                    >
                        <Icon icon={ACTION_ICONS[action.name]} />
                    </Button>
                </ActionButton>
            ))}
        </Box>
    );
};