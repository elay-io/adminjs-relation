import { Box, Button, Icon } from "@adminjs/design-system";
import { ActionButton, ResourceJSON, useTranslation } from "adminjs";
import React from "react";
import { useRelationConfig } from "../../providers/RelationConfigProvider";
import { useRedirectUrl } from "../shared/useRedirectUrl";
import { OneToManyRelationOptions } from "@/global-types";
import allowOverride from "../shared/allow-override";

type Props = {
    targetResource: ResourceJSON;
};

const RelationResourceActions: React.FC<Props> = ({ targetResource }) => {
    const { ownerRecord, relations, relation } = useRelationConfig();
    const { ta: translateAction } = useTranslation();
    const redirectUrl = useRedirectUrl();

    const currentRelation = relations[relation] as OneToManyRelationOptions;
    const targetResourceId = currentRelation.target.resourceId;
    const joinKey = currentRelation.target.joinKey;

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



const OverridableRelationResourceActions = allowOverride(RelationResourceActions, 'RelationResourceActions')
export {
    OverridableRelationResourceActions as default,
    OverridableRelationResourceActions as RelationResourceActions,
    RelationResourceActions as OriginalRelationResourceActions,
}
