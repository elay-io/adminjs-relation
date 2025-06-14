import { Messages } from '@/constants/messages';
import { ManyToManyRelationOptions, RelationsFeatureConfig } from '@/global-types';
import { ActionHandler, ActionResponse, AppError, Filter } from 'adminjs';

/**
 * Handler for deleting many-to-many relations
 * @param {object} config - Configuration object
 * @param {object} config.relations - Relations configuration map
 * @returns {Function} Handler function for deleting relations
 */
export const deleteRelationHandler =
  ({ relations }: RelationsFeatureConfig): ActionHandler<ActionResponse> =>
  async (request, response, context) => {
    const { record: ownerRecord, _admin: adminInstance, resource: ownerResource } = context;

    // Parse query parameters
    const queryParams = request.query ?? {};
    const { relation: relationName, targetRecordId } = queryParams;

    // Validate required parameters
    if (!relationName || !targetRecordId || !ownerRecord) {
      return {
        record: ownerRecord?.toJSON?.(context.currentAdmin),
        notice: {
          type: 'error',
          message: Messages.QueryParamsMissing,
          resourceId: ownerResource.id(),
        },
      };
    }

    // Get relation configuration
    const relationConfig = relations[relationName] as ManyToManyRelationOptions;
    const { junction } = relationConfig;

    // Validate junction configuration
    if (!junction) {
      throw new AppError(Messages.JunctionMissing);
    }

    // Get junction resource
    const junctionResource = adminInstance.findResource(junction.throughResourceId);
    if (!junctionResource) {
      throw new AppError(
        Messages.JunctionResourceMissing,
        { junctionResourceId: junction.throughResourceId },
        { options: { junctionResourceId: junction.throughResourceId } }
      );
    }

    // Find junction record
    const [junctionRecord] = await junctionResource.find(
      new Filter(
        {
          [junction.inverseJoinKey]: targetRecordId,
          [junction.joinKey]: ownerRecord.id(),
        },
        junctionResource
      ),
      {
        limit: 1,
        offset: 0,
        sort: {
          sortBy: junction.joinKey,
          direction: 'desc',
        },
      }
    );

    // Validate junction record exists
    if (!junctionRecord) {
      throw new AppError(Messages.JunctionRecordMissing);
    }

    // Delete junction record
    await junctionResource.delete(junctionRecord.id());

    return {
      record: ownerRecord.toJSON(context.currentAdmin),
      notice: {
        type: 'success',
        message: Messages.RelationSuccessfullyDeleted,
        resourceId: ownerResource.id(),
      },
    };
  };
