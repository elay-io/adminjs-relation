import { R as RelationsFeatureConfig } from '../../index-Di23omGm.mjs';
import { ActionHandler, ActionResponse } from 'adminjs';

/**
 * Handler for deleting many-to-many relations
 * @param {object} config - Configuration object
 * @param {object} config.relations - Relations configuration map
 * @returns {Function} Handler function for deleting relations
 */
declare const deleteRelationHandler: ({ relations }: RelationsFeatureConfig) => ActionHandler<ActionResponse>;

export { deleteRelationHandler };
