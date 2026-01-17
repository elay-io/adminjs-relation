import { ActionResponse, ActionRequest, ActionContext } from 'adminjs';

/**
 * After hook for redirecting back to the owning resource details page
 * This hook is called after a record is created/updated to handle redirection
 *
 * @param {object} response - Response from the previous action
 * @param {object} request - Request object containing query parameters
 * @returns {object} Modified response with redirect URL if applicable
 */
declare const redirectToOwningResourceDetails: (response: ActionResponse, request: ActionRequest, context: ActionContext) => ActionResponse;

export { redirectToOwningResourceDetails };
