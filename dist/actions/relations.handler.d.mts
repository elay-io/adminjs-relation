import { ActionHandler } from 'adminjs';
import { R as RelationsFeatureConfig, a as RelationsActionResponse } from '../index-Di23omGm.mjs';

/**
 * Handler for finding relations between resources
 * @param {object} config - Configuration object
 * @param {object} config.relations - Relations configuration map
 * @returns {Function} Handler function for finding relations
 */
declare const findRelationHandler: ({ relations }: RelationsFeatureConfig) => ActionHandler<RelationsActionResponse>;

export { findRelationHandler };
