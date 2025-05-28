import { InfoBox, Text, Button, Icon } from "@adminjs/design-system";
import { ActionButton, useTranslation } from "adminjs";
import React from "react";
import { Messages } from "../../constants/messages.js";
import { useRelationConfig } from "../../providers/RelationConfigProvider.js";

export const RelationNoRecords = ({ resource }) => {
    const { name: resourceName, id: resourceId, resourceActions } = resource;
    
    const {
        ownerRecord,
        relations,
        relation
    } = useRelationConfig();

    const { tb: translateButton, tm: translateMessage } = useTranslation();

    const targetResourceId = relations[relation].target.resourceId;
    const joinKey = relations[relation].junction?.joinKey;
    const inverseJoinKey = relations[relation].junction?.inverseJoinKey;

    if (!targetResourceId || !joinKey || !inverseJoinKey) {
        return null;
    }

    const createAction = resourceActions.find(
        ({ name }) => name === "new"
    );

    const actionQueryParams = {
        [joinKey]: ownerRecord.id,
        junctionResourceId: relations[relation].junction?.throughResourceId,
        joinKey,
        inverseJoinKey,
        redirectUrl: location.href
    };

    return (
        <InfoBox
            title={translateMessage(Messages.NoRelationRecordsTitle, resourceId)}
            illustration="Docs"
        >
            <Text mb="xxl">
                {translateMessage(Messages.NoRelationRecords, resourceId, {
                    relationName: resourceName
                })}
            </Text>

            {createAction && (
                <ActionButton
                    action={createAction}
                    resourceId={resourceId}
                    queryParams={actionQueryParams}
                >
                    <Button variant="contained">
                        <Icon icon="Plus" />
                        {translateButton("createFirstRecord", resourceId)}
                    </Button>
                </ActionButton>
            )}
        </InfoBox>
    );
};