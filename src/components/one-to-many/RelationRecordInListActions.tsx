import { Box, Button, Icon } from "@adminjs/design-system";
import { ActionButton, ActionResponse, RecordJSON, ResourceJSON } from "adminjs";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import { useRelationConfig } from "../../providers/RelationConfigProvider";
import { useRedirectUrl } from "../shared/useRedirectUrl";
import allowOverride from "../shared/allow-override";

const ACTION_ICONS = {
    show: "Eye",
    edit: "Edit2",
    delete: "Trash2"
};

type Props = {
    record: RecordJSON;
    resource: ResourceJSON;
};

const RelationRecordInListActions: React.FC<Props> = ({ record, resource }) => {
    const { recordActions, id: recordId } = record;
    const { id: resourceId } = resource;
    const { refresh } = useRelationConfig();

    const navigate = useNavigate();
    const redirectUrl = useRedirectUrl();
    const { pathname, search } = useLocation();

    const handleActionPerformed = ({ notice }: ActionResponse) => {
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
                        <Icon icon={(ACTION_ICONS as any)[action.name]} />
                    </Button>
                </ActionButton>
            ))}
        </Box>
    );
};


const OverridableRelationRecordInListActions = allowOverride(RelationRecordInListActions, 'RelationRecordInListActions')
export {
    OverridableRelationRecordInListActions as default,
    OverridableRelationRecordInListActions as RelationRecordInListActions,
    RelationRecordInListActions as OriginalRelationRecordInListActions,
}
