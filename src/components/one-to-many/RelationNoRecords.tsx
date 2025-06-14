import { InfoBox, Text, Button, Icon } from "@adminjs/design-system";
import { ActionButton, ResourceJSON, useTranslation } from "adminjs";
import React from "react";
import { Messages } from "@/constants/messages";
import { useRelationConfig } from "@/providers/RelationConfigProvider";
import { OneToManyRelationOptions } from "@/global-types";

type Props = {
    resource: ResourceJSON;
};

export const RelationNoRecords: React.FC<Props> = ({ resource }) => {
    const { name: resourceName, id: resourceId, resourceActions } = resource;
    const { ownerRecord, relations, relation } = useRelationConfig();
    const { tb: translateButton, tm: translateMessage } = useTranslation();

    const joinKey = (relations[relation] as OneToManyRelationOptions).target.joinKey;
    const createAction = resourceActions.find(
        ({ name }) => name === "new"
    );

    if (!joinKey) {
        return null;
    }

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
                    queryParams={{
                        [joinKey]: ownerRecord.id,
                        redirectUrl: location.href
                    }}
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