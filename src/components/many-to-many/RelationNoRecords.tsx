import { InfoBox, Text, Button, Icon } from "@adminjs/design-system";
import { ActionButton, ResourceJSON, useTranslation } from "adminjs";
import React from "react";
import { Messages } from "../../constants/messages";
import { useRelationConfig } from "../../providers/RelationConfigProvider";
import { ManyToManyRelationOptions } from "@/global-types";
import allowOverride from '@/components/shared/allow-override';

type Props = {
    resource: ResourceJSON;
};
const RelationNoRecords: React.FC<Props> = ({ resource }) => {
    const { name: resourceName, id: resourceId, resourceActions } = resource;

    const {
        ownerRecord,
        relations,
        relation
    } = useRelationConfig();

    const { tb: translateButton, tm: translateMessage } = useTranslation();

    const currentRelation = relations[relation] as ManyToManyRelationOptions;
    const targetResourceId = currentRelation.target.resourceId;
    const joinKey = currentRelation.junction?.joinKey;
    const inverseJoinKey = currentRelation.junction?.inverseJoinKey;

    if (!targetResourceId || !joinKey || !inverseJoinKey) {
        return null;
    }

    const createAction = resourceActions.find(
        ({ name }) => name === "new"
    );

    const actionQueryParams = {
        [joinKey]: ownerRecord.id,
        junctionResourceId: currentRelation.junction?.throughResourceId,
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

const OverridableRelationNoRecords = allowOverride(RelationNoRecords, 'RelationNoRecords')
export {
    OverridableRelationNoRecords as default,
    OverridableRelationNoRecords as RelationNoRecords,
    RelationNoRecords as OriginalRelationNoRecords,
}