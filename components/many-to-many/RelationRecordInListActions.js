import { Box, Button, Icon, Modal } from "@adminjs/design-system";
import { ActionButton, ApiClient, useNotice, useTranslation } from "adminjs";
import React, { useState } from "react";
import { Actions, Labels } from "../../constants/messages.js";
import { useRelationConfig } from "../../providers/RelationConfigProvider.js";
import { useRedirectUrl } from "../shared/useRedirectUrl.js";

const apiClient = new ApiClient();

const ACTION_ICONS = {
    show: "Eye",
    edit: "Edit2",
    delete: "Trash2"
};

export const RelationRecordInListActions = ({ record, resource }) => {
    const { recordActions, id: recordId } = record;
    const { id: resourceId } = resource;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        ownerRecord,
        ownerResource,
        relation,
        relations,
        refresh
    } = useRelationConfig();

    const {
        deleteOptions: {
            enableDeleteRelation = true,
            enableDeleteRelatedRecord = true
        } = {}
    } = relations[relation];

    const addNotice = useNotice();
    const { ta: translateAction, tl: translateLabel } = useTranslation();
    const redirectUrl = useRedirectUrl();

    const handleCloseModal = (shouldRefresh = false) => {
        if (shouldRefresh) {
            refresh();
        }
        setIsModalOpen(false);
    };

    const handleDeleteRelation = async () => {
        const { data } = await apiClient.recordAction({
            resourceId: ownerResource.id,
            actionName: "deleteRelation",
            recordId: ownerRecord.id,
            params: {
                targetRecordId: recordId,
                relation
            }
        });
        return data;
    };

    const handleDeleteRecord = async () => {
        const { data } = await apiClient.recordAction({
            resourceId,
            actionName: "delete",
            recordId
        });
        return data;
    };

    const handleNotice = (response) => {
        const { notice } = response;
        if (notice) {
            addNotice(notice);
        }
    };

    // Build delete actions
    const deleteActions = [];

    // Remove relation action
    const removeRelationAction = {
        variant: "outlined",
        label: translateAction(Actions.RemoveRelation, resourceId),
        onClick: async () => {
            const response = await handleDeleteRelation();
            handleCloseModal(true);
            handleNotice(response);
        }
    };

    // Remove record action
    const removeRecordAction = {
        variant: "outlined",
        label: translateAction(Actions.RemoveRecord, resourceId),
        color: "danger",
        onClick: async () => {
            let response = await handleDeleteRelation();
            const { notice } = response;

            handleCloseModal(true);

            if (notice && notice.type === "success") {
                response = await handleDeleteRecord();
                handleNotice(response);
            }
        }
    };

    // Add delete actions based on permissions
    const deleteRelationAction = ownerRecord.recordActions.find(
        action => action.name === "deleteRelation"
    );
    if (enableDeleteRelation && deleteRelationAction) {
        deleteActions.push(removeRelationAction);
    }

    const deleteRecordAction = recordActions.find(
        action => action.name === "delete"
    );
    if (enableDeleteRelatedRecord && deleteRecordAction) {
        deleteActions.push(removeRecordAction);
    }

    const modalProps = {
        title: translateLabel(Labels.DeleteRelationHeader),
        onOverlayClick: handleCloseModal,
        onClose: handleCloseModal,
        buttons: deleteActions
    };

    // Filter out delete action as it's handled separately
    const standardActions = recordActions.filter(
        action => action.name !== "delete"
    );

    return (
        <Box flex>
            {standardActions.map(action => (
                <ActionButton
                    key={action.name}
                    action={action}
                    resourceId={resourceId}
                    recordId={recordId}
                    queryParams={{ redirectUrl }}
                >
                    <Button size="icon" rounded color={action.variant}>
                        <Icon icon={ACTION_ICONS[action.name]} />
                    </Button>
                </ActionButton>
            ))}

            {deleteActions.length > 0 && (
                <>
                    {isModalOpen && <Modal {...modalProps} />}
                    <Button
                        size="icon"
                        rounded
                        color="danger"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Icon icon={ACTION_ICONS.delete} />
                    </Button>
                </>
            )}
        </Box>
    );
};