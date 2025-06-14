import { Badge } from "@adminjs/design-system";
import { BasePropertyJSON, BasePropertyProps, useTranslation } from "adminjs";
import React from "react";

// TODO: [AJS-400] Introduce relations edit
const RelationsListPropertyComponent = (props: BasePropertyProps) => {
    const { resource: { properties }, property } = props;

    const { relationsTargets } = (properties[property.path] as BasePropertyJSON).props;
    const targets: any[] = Object.values(relationsTargets);
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

export default RelationsListPropertyComponent;