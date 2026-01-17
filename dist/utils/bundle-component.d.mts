import { ComponentLoader } from 'adminjs';

/**
 * Bundles a component for AdminJS
 *
 * @param loader - The AdminJS ComponentLoader instance
 * @param componentName - The name of the component to bundle
 * @returns The bundled component id string
 */
declare const bundleComponent: (loader: ComponentLoader, componentName: string) => string;

export { bundleComponent as default };
