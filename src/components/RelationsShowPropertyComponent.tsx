import {
    Tab,
    Tabs
} from "@adminjs/design-system";
import {
    BasePropertyProps,
    useQueryParams,
    useTranslation
} from "adminjs";
import React, {
    useCallback
} from "react";
import {
    RelationConfigProvider
} from "../providers/RelationConfigProvider";
import {
    RelationTab
} from "./shared/RelationTab";
import allowOverride from "./shared/allow-override";

const RelationsShowPropertyComponent = (props: BasePropertyProps) => {
    const {
        resource,
        record,
        property
    } = props;

    const {
        id: resourceId,
        properties: resourceProperties
    } = resource;

    const { relations } = resourceProperties[property.path].props;
    const relationKeys = Object.keys(relations);

    const {
        tab: selectedTab = relationKeys[0],
        storeParams
    } = useQueryParams();

    const { tl: translate } = useTranslation();

    const handleTabChange = useCallback((newTab: any) => {
        storeParams({
            tab: newTab,
            sortBy: undefined,
            direction: undefined,
            redirectUrl: undefined
        });
    }, []);

    if (!record || !relationKeys.length) {
        return null;
    }

    return (
        <Tabs currentTab={selectedTab} onChange={handleTabChange}>
            {relationKeys.map(relationKey => (
                <Tab
                    key={relationKey}
                    id={relationKey}
                    label={translate(relationKey, resourceId)}
                >
                    <RelationConfigProvider
                        relation={relationKey}
                        relations={relations}
                        ownerResource={resource}
                        ownerRecord={record}
                    >
                        <RelationTab />
                    </RelationConfigProvider>
                </Tab>
            ))}
        </Tabs>
    );
};


const OverridableRelationsShowPropertyComponent = allowOverride(RelationsShowPropertyComponent, 'RelationsShowPropertyComponent')

export {
    OverridableRelationsShowPropertyComponent as default,
    OverridableRelationsShowPropertyComponent as RelationsShowPropertyComponent,
    RelationsShowPropertyComponent as OriginalRelationsShowPropertyComponent,
}