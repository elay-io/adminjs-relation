import { Box, Button, Icon } from "@adminjs/design-system";
import { ActionButton, useTranslation } from "adminjs";
import React from "react";
import { useRelationConfig } from "../../providers/RelationConfigProvider.js";
import { useRedirectUrl } from "../shared/useRedirectUrl.js";

export const RelationResourceActions = ({ targetResource }) => {
    const { ownerRecord, relations, relation } = useRelationConfig();
    const { ta: translateAction } = useTranslation();
    const redirectUrl = useRedirectUrl();

    const targetResourceId = relations[relation].target.resourceId;
    const joinKey = relations[relation].target.joinKey;

    if (!joinKey) {
        return null;
    }

    const createActions = targetResource.resourceActions.filter(
        ({ name }) => name === "new"
    );

    if (!createActions.length) {
        return null;
    }

    return (
        <Box flex mb="xl" justifyContent="end">
            {createActions.map(action => (
                <ActionButton
                    key={action.name}
                    action={action}
                    resourceId={targetResourceId}
                    queryParams={{
                        [joinKey]: ownerRecord.id,
                        redirectUrl
                    }}
                >
                    <Button variant="contained">
                        <Icon icon={action.icon} />
                        {translateAction(action.name, targetResource.id)}
                    </Button>
                </ActionButton>
            ))}
        </Box>
    );
};