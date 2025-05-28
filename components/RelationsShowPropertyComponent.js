import {
    Tab,
    Tabs
} from "@adminjs/design-system";
import {
    useQueryParams,
    useTranslation
} from "adminjs";
import React, {
    memo,
    useCallback
} from "react";
import {
    RelationConfigProvider
} from "../providers/RelationConfigProvider.js";
import {
    RelationTab
} from "./shared/RelationTab.js";

const RelationsShowPropertyComponent = (props) => {
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

    const handleTabChange = useCallback((newTab) => {
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

export default memo(RelationsShowPropertyComponent);