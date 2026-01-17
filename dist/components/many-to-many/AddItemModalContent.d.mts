import { ResourceJSON, RecordJSON } from 'adminjs';
import React from 'react';

interface Props {
    targetResource: ResourceJSON;
    ownerResource: ResourceJSON;
    ownerRecord: RecordJSON;
    relation: string;
    onCloseModal: (refresh?: boolean) => void;
}
declare const AddItemModal: React.FC<Props>;
declare const OverridableAddItemModal: React.ComponentType<Props & {
    OriginalComponent?: React.ComponentType<Props> | undefined;
}>;

export { OverridableAddItemModal as AddItemModal, AddItemModal as OriginalAddItemModal, OverridableAddItemModal as default };
