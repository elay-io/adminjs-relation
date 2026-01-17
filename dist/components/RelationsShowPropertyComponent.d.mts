import { BasePropertyProps } from 'adminjs';
import React from 'react';

declare const RelationsShowPropertyComponent: (props: BasePropertyProps) => React.JSX.Element | null;
declare const OverridableRelationsShowPropertyComponent: React.ComponentType<BasePropertyProps & {
    OriginalComponent?: React.ComponentType<BasePropertyProps> | undefined;
}>;

export { RelationsShowPropertyComponent as OriginalRelationsShowPropertyComponent, OverridableRelationsShowPropertyComponent as RelationsShowPropertyComponent, OverridableRelationsShowPropertyComponent as default };
