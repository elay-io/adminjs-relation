import { ActionResponse, ActionRequest, ActionContext } from 'adminjs';

/**
 * After hook for assigning many-to-many relations
 * This hook is called after a record is created/updated to establish the relation
 * in the junction table
 *
 * @param {object} response - Response from the previous action
 * @param {object} request - Request object
 * @param {object} context - AdminJS action context
 * @returns {Promise<object>} Modified response
 */
declare const assignManyToManyRelation: (response: ActionResponse, request: ActionRequest, context: ActionContext) => Promise<ActionResponse>;

export { assignManyToManyRelation };
