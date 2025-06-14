import {
    Box,
    Button,
    MessageBox,
    SelectAsync
} from "@adminjs/design-system";
import {
    ApiClient,
    RecordJSON,
    ResourceJSON,
    useTranslation
} from "adminjs";
import React, {
    useEffect,
    useState
} from "react";
import allowOverride from '@/components/shared/allow-override';

const apiClient = new ApiClient();

interface Props {
    targetResource: ResourceJSON;
    ownerResource: ResourceJSON;
    ownerRecord: RecordJSON;
    relation: string;
    onCloseModal: (refresh?: boolean) => void;
}

const AddItemModal: React.FC<Props> = ({
    targetResource,
    ownerResource,
    ownerRecord,
    relation,
    onCloseModal
}) => {
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [selectedRecord, setSelectedRecord] = useState<RecordJSON>();
    const [error, setError] = useState<any>();
    const [loadingCount, setLoadingCount] = useState(0);

    const { tb: translateButton, tm: translateMessage } = useTranslation();

    useEffect(() => {
        if (!selectedItemId) {
            return;
        }

        setLoadingCount(count => count + 1);

        const client = new ApiClient();
        client.recordAction({
            actionName: "show",
            resourceId: targetResource.id,
            recordId: selectedItemId.toString()
        })
            .then(({ data }) => {
                setSelectedRecord(data.record);
            })
            .finally(() => {
                setLoadingCount(count => count - 1);
            });
    }, [selectedItemId, targetResource]);

    const record = selectedRecord;
    const selectValue = selectedItemId && record
        ? {
            value: record.id,
            label: record.title
        }
        : {
            value: "",
            label: ""
        };

    const handleCancel = () => {
        onCloseModal(false);
    };

    const handleSubmit = async () => {
        setError(undefined);

        const response = await apiClient.recordAction({
            recordId: ownerRecord.id,
            resourceId: ownerResource.id,
            actionName: "addManyToManyRelation",
            data: {
                targetId: selectedItemId
            },
            params: {
                relation
            }
        });

        const { data } = response;
        const { notice } = data ?? {};

        if (notice) {
            if (notice.type === "success") {
                onCloseModal(true);
            } else {
                setError(notice);
            }
        }
    };

    const handleLoadOptions = async (query: any) => {
        const results = await apiClient.searchRecords({
            resourceId: targetResource.id,
            query
        });

        return results.map(item => ({
            value: item.id,
            label: item.title,
            record: item
        }));
    };

    const handleSelectChange = (selected: any) => {
        setSelectedItemId(selected ? selected.value : null);
    };

    return (
        <Box flex flexDirection="column" width="100%" mt="md">
            {error && (
                <MessageBox
                    message={translateMessage(error.message, error.resourceId, error.options)}
                    variant={error.type === "error" ? "danger" : error.type ?? "info"}
                    my="md"
                />
            )}

            <SelectAsync
                cacheOptions
                value={selectValue}
                defaultOptions
                loadOptions={handleLoadOptions}
                onChange={handleSelectChange}
                isClearable
                isLoading={!!loadingCount}
            />

            <Box flex justifyContent="center" mt="xxl">
                <Button
                    variant="light"
                    color="primary"
                    onClick={handleCancel}
                    mr="md"
                >
                    {translateButton("cancel")}
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!selectedItemId}
                >
                    {translateButton("submit")}
                </Button>
            </Box>
        </Box>
    );
};

const OverridableAddItemModal = allowOverride(AddItemModal, 'AddItemModal')
export {
    OverridableAddItemModal as default,
    OverridableAddItemModal as AddItemModal,
    AddItemModal as OriginalAddItemModal,
}
