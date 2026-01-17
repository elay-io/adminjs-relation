import { ComponentType } from 'react';

/**
 * @private
 *
 * @classdesc
 * Overrides one of the AdminJS core components when user passes it's name to ComponentLoader
 *
 * If case of being overridden, component receives additional prop: `OriginalComponent`
 *
 * @example
 * new ComponentLoader().override('SidebarFooter', MySidebarFooter)
 */
declare function allowOverride<P extends Record<string, any>>(OriginalComponent: ComponentType<P>, name: string): ComponentType<P & {
    OriginalComponent?: ComponentType<P>;
}>;

export { allowOverride, allowOverride as default };
