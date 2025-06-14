import { ComponentLoader } from 'adminjs';
import path from 'node:path';
import url from 'node:url';

// @ts-ignore
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

/**
 * Bundles a component for AdminJS
 *
 * @param loader - The AdminJS ComponentLoader instance
 * @param componentName - The name of the component to bundle
 * @returns The bundled component id string
 */
const bundleComponent = (loader: ComponentLoader, componentName: string): string => {
  const componentPath = path.join(__dirname, `../components/${componentName}`);
  return loader.add(componentName, componentPath);
};

export default bundleComponent;
