import { Badge } from "@adminjs/design-system";
import { useTranslation } from "adminjs";
import React, { memo } from "react";

// TODO: [AJS-400] Introduce relations edit
const RelationsListPropertyComponent = (props) => {
    const { 
        resource: { properties },
        property 
    } = props;

    const { relationsTargets } = properties[property.path].props;
    const targets = Object.values(relationsTargets);
    const { tl: translate } = useTranslation();

    return (
        <React.Fragment>
            {targets.map(({ resourceId }) => (
                <Badge key={resourceId} mr="sm">
                    {translate(resourceId, resourceId)}
                </Badge>
            ))}
        </React.Fragment>
    );
};

export default memo(RelationsListPropertyComponent);