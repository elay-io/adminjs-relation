import {
    Box,
    Button,
    Icon,
    Modal
} from "@adminjs/design-system";
import {
    ActionButton,
    ResourceJSON,
    useTranslation
} from "adminjs";
import React, {
    useState
} from "react";
import {
    Actions,
    Labels,
    Messages
} from "../../constants/messages";
import {
    useRelationConfig
} from "../../providers/RelationConfigProvider";
import AddItemModalContent from "./AddItemModalContent";
import {
    useRedirectUrl
} from "../shared/useRedirectUrl";
import { ManyToManyRelationOptions } from "@/global-types";
type Props = {
    targetResource: ResourceJSON;
    ownerResource: ResourceJSON;
    junctionResource: ResourceJSON;
};

export const RelationResourceActions: React.FC<Props> = ({ targetResource, ownerResource, junctionResource }) => {
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
    const currentRelation = relations[relation] as ManyToManyRelationOptions;
    const joinKey = currentRelation.junction?.joinKey;
    const inverseJoinKey = currentRelation.junction?.inverseJoinKey;

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
                            junctionResourceId: currentRelation.junction?.throughResourceId,
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