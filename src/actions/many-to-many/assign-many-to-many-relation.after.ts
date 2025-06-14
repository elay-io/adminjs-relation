import { ActionContext, ActionRequest, ActionResponse, AppError } from 'adminjs';
import { Messages } from '@/constants/messages';

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
export const assignManyToManyRelation = async (
  response: ActionResponse,
  request: ActionRequest,
  context: ActionContext
) => {
  // Only process POST requests
  if (request.method !== 'post') {
    return response;
  }

  // Skip if there are validation errors
  if (Object.keys(response.record?.errors ?? {}).length) {
    return response;
  }

  const { _admin: adminInstance, record: contextRecord } = context;
  const queryParams = request.query ?? {};

  // Extract junction table configuration from query params
  const { junctionResourceId, joinKey, inverseJoinKey } = queryParams;

  const ownerRecordId = queryParams[joinKey];

  // Validate required parameters
  if (!junctionResourceId || !joinKey || !inverseJoinKey || !ownerRecordId) {
    return response;
  }

  // Get junction resource
  const junctionResource = adminInstance.findResource(junctionResourceId);
  if (!junctionResource) {
    throw new AppError(Messages.JunctionResourceMissing, { junctionResourceId }, { options: { junctionResourceId } });
  }

  // Create junction record
  await junctionResource.create({
    [joinKey]: ownerRecordId,
    [inverseJoinKey]: contextRecord?.id() ?? response.record.id,
  });

  return response;
};
