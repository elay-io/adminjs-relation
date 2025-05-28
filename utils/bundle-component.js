import path from "path";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

/**
 * Bundles a component for AdminJS
 * @param {object} admin - The AdminJS instance
 * @param {string} componentName - The name of the component to bundle
 * @returns {object} The AdminJS instance with the bundled component
 */
const bundleComponent = (admin, componentName) => {
    const componentPath = path.join(__dirname, `../components/${componentName}`);
    return admin.add(componentName, componentPath);
};

export default bundleComponent;