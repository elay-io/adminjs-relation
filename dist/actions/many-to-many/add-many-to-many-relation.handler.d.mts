import { R as RelationsFeatureConfig } from '../../index-Di23omGm.mjs';
import { ActionHandler, ActionResponse } from 'adminjs';

/**
 * Handler for adding many-to-many relations
 * @param {object} config - Configuration object
 * @param {object} config.relations - Relations configuration map
 * @returns {Function} Handler function for adding relations
 */
declare const addManyToManyRelationHandler: ({ relations }: RelationsFeatureConfig) => ActionHandler<ActionResponse>;

export { addManyToManyRelationHandler };
