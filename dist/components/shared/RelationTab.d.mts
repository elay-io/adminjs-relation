import React from 'react';

declare const RelationTab: () => React.JSX.Element | null;
declare const OverridableRelationTab: React.ComponentType<Record<string, any> & {
    OriginalComponent?: React.ComponentType<Record<string, any>> | undefined;
}>;

export { RelationTab as OriginalRelationTab, OverridableRelationTab as RelationTab, OverridableRelationTab as default };
