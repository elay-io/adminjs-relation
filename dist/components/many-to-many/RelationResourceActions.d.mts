import { ResourceJSON } from 'adminjs';
import React from 'react';

type Props = {
    targetResource: ResourceJSON;
    ownerResource: ResourceJSON;
    junctionResource: ResourceJSON;
};
declare const RelationResourceActions: React.FC<Props>;
declare const OverridableRelationResourceActions: React.ComponentType<Props & {
    OriginalComponent?: React.ComponentType<Props> | undefined;
}>;

export { RelationResourceActions as OriginalRelationResourceActions, OverridableRelationResourceActions as RelationResourceActions, OverridableRelationResourceActions as default };
