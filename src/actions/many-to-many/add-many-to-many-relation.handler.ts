import { Messages } from '@/constants';
import { ManyToManyRelationOptions, RelationsFeatureConfig } from '@/global-types';
import { ActionHandler, ActionResponse, AppError, Filter, flat } from 'adminjs';

/**
 * Handler for adding many-to-many relations
 * @param {object} config - Configuration object
 * @param {object} config.relations - Relations configuration map
 * @returns {Function} Handler function for adding relations
 */
export const addManyToManyRelationHandler =
  ({ relations }: RelationsFeatureConfig): ActionHandler<ActionResponse> =>
  async (request, response, context) => {
    // Return early for GET requests
    if (request.method === 'get') {
      return response;
    }

    const { _admin: adminInstance, record: ownerRecord, resource: ownerResource } = context;

    // Parse request data
    const { query, payload = {} } = request;
    const queryParams = flat.unflatten(query || {});
    const { relation: relationName } = queryParams;

    // Get relation configuration
    const relationConfig = relations[relationName] as ManyToManyRelationOptions;
    const { junction } = relationConfig;

    // Validate junction configuration
    if (!junction) {
      throw new AppError(Messages.JunctionMissing);
    }

    // Get junction resource
    const junctionResource = adminInstance.findResource(junction.throughResourceId);

    // Check if relation already exists
    const [existingRelation] = await junctionResource.find(
      new Filter(
        {
          [junction.joinKey]: context.record?.id(),
          [junction.inverseJoinKey]: payload.targetId,
        },
        junctionResource
      ),
      {
        limit: 1,
        offset: 0,
        sort: {
          sortBy: junction.joinKey,
          direction: 'asc',
        },
      }
    );

    if (existingRelation) {
      throw new AppError(Messages.ManyToManyRelationAlreadyExists);
    }

    // Create new junction record
    await junctionResource.create({
      [junction.joinKey]: ownerRecord?.id(),
      [junction.inverseJoinKey]: payload.targetId,
    });

    return {
      record: ownerRecord?.toJSON(context.currentAdmin),
      notice: {
        type: 'success',
        message: Messages.RelationSuccessfullyAdded,
        resourceId: ownerResource.id(),
      },
    };
  };
