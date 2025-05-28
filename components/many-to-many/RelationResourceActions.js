import {
    Box,
    Button,
    Icon,
    Modal
} from "@adminjs/design-system";
import {
    ActionButton,
    useTranslation
} from "adminjs";
import React, {
    useState
} from "react";
import {
    Actions,
    Labels,
    Messages
} from "../../constants/messages.js";
import {
    useRelationConfig
} from "../../providers/RelationConfigProvider.js";
import AddItemModalContent from "./AddItemModalContent.js";
import {
    useRedirectUrl
} from "../shared/useRedirectUrl.js";

export const RelationResourceActions = ({ targetResource, ownerResource, junctionResource }) => {
    const {
        ownerRecord,
        relations,
        relation,
        refresh
    } = useRelationConfig();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { ta: translateAction, tl: translateLabel, tm: translateMessage } = useTranslation();
    const redirectUrl = useRedirectUrl();

    const targetResourceId = relations[relation].target.resourceId;
    const joinKey = relations[relation].junction?.joinKey;
    const inverseJoinKey = relations[relation].junction?.inverseJoinKey;

    const handleCloseModal = (shouldRefresh = false) => {
        if (shouldRefresh) {
            refresh();
        }
        setIsModalOpen(false);
    };

    if (!joinKey || !inverseJoinKey) {
        return null;
    }

    const modalProps = {
        title: translateLabel(Labels.ChooseItemHeader, targetResource.id),
        subTitle: translateMessage(Messages.ChooseItemSubtitle, targetResource.id),
        onOverlayClick: handleCloseModal,
        onClose: handleCloseModal
    };

    const junctionNewAction = junctionResource.resourceActions.find(
        ({ name }) => name === "new"
    );

    const targetNewActions = targetResource.resourceActions.filter(
        ({ name }) => name === "new"
    );

    if (!junctionNewAction) {
        return null;
    }

    return (
        <Box flex justifyContent="end">
            {junctionNewAction && (
                <>
                    {isModalOpen && (
                        <Modal {...modalProps}>
                            <AddItemModalContent
                                targetResource={targetResource}
                                ownerResource={ownerResource}
                                ownerRecord={ownerRecord}
                                relation={relation}
                                onCloseModal={handleCloseModal}
                            />
                        </Modal>
                    )}
                    <Box flex mb="xl" mr="xl" justifyContent="end">
                        <Button
                            variant="outline"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Icon icon="PlusCircle" />
                            {translateAction(Actions.AddItem, targetResource.id)}
                        </Button>
                    </Box>
                </>
            )}

            {targetNewActions.map(action => (
                <Box key={action.name} flex mb="xl" justifyContent="end">
                    <ActionButton
                        action={action}
                        resourceId={targetResourceId}
                        queryParams={{
                            [joinKey]: ownerRecord.id,
                            junctionResourceId: relations[relation].junction?.throughResourceId,
                            joinKey,
                            inverseJoinKey,
                            redirectUrl
                        }}
                    >
                        <Button variant="contained">
                            <Icon icon={action.icon} />
                            {translateAction(action.name, targetResource.id)}
                        </Button>
                    </ActionButton>
                </Box>
            ))}
        </Box>
    );
};