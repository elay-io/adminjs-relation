import { ActionContext, ActionQueryParameters, AppError, Filter, populator, RecordJSON } from 'adminjs';
import { Messages } from '../../constants/messages';
import { ManyToManyRelationOptions, RelationLoaderHandlerConfig } from '@/global-types';

/**
 * Handles fetching records for many-to-many relationships
 * @param {string} recordId - ID of the owner record
 * @param {object} params - Handler parameters
 * @param {object} params.relation - Relation configuration
 * @param {object} params.targetResource - Target resource instance
 * @param {object} [queryParams={}] - Query parameters for filtering and pagination
 * @param {object} context - AdminJS action context
 * @returns {Promise<object>} Records and metadata for the relation
 */
export const manyToManyHandler = async (
  recordId: string,
  { relation, targetResource }: RelationLoaderHandlerConfig<ManyToManyRelationOptions>,
  queryParams: ActionQueryParameters | undefined = {},
  context: ActionContext
): Promise<{
  meta: {
    total: number;
    perPage: number;
    page: number;
    sortBy: string;
    direction: 'desc' | 'asc';
  };
  records: RecordJSON[];
  record: RecordJSON | undefined;
}> => {
  const { sortBy, direction, perPage = context._admin.options.settings?.defaultPerPage || 10, page = 1 } = queryParams;

  const { junction } = relation;

  // Validate junction configuration
  if (!junction) {
    throw new Error(Messages.JunctionMissing);
  }

  if (!junction.throughResourceId) {
    throw new AppError(Messages.JunctionResourceIdMissing);
  }

  // Get junction resource
  const junctionResource = context._admin.findResource(junction.throughResourceId);
  if (!junctionResource) {
    throw new AppError(
      Messages.JunctionResourceMissing,
      { junctionResourceId: junction.throughResourceId },
      { options: { junctionResourceId: junction.throughResourceId } }
    );
  }

  // Build filter for junction records
  const junctionFilter = new Filter({ [junction.joinKey]: recordId }, junctionResource);

  // Set up sorting
  const defaultSort = {
    sortBy: junction.inverseJoinKey,
    direction: 'desc',
  };

  let sortOptions = defaultSort;

  // Special handling for Prisma database
  if (junctionResource.databaseName() === 'prisma' && sortBy) {
    sortOptions = {
      sortBy: `${junction.inverseJoinKey}.${sortBy}`,
      direction: direction || 'desc',
    };
  }

  // Fetch junction records with pagination
  const junctionRecords = await junctionResource.find(
    junctionFilter,
    {
      limit: perPage,
      offset: (page - 1) * perPage,
      sort: sortOptions as any,
    },
    context
  );

  const totalRecords = await junctionResource.count(junctionFilter, context);

  // Extract target record IDs from junction records
  const targetIds = junctionRecords.map((record) => record.params[junction.inverseJoinKey]);

  // Filter out undefined/null IDs
  const validTargetIds = targetIds.filter((id) => typeof id !== 'undefined' && id !== null);

  // Fetch target records
  const targetRecords = await targetResource.findMany(validTargetIds);

  // Maintain original order from junction records
  const orderedRecords = targetIds.map((id) => targetRecords.find((record) => record.id() === id)).filter(Boolean);

  // Populate related data
  const populatedRecords = await populator(orderedRecords as any, context);

  // Update context with populated records
  context.records = populatedRecords;

  return {
    meta: {
      total: totalRecords,
      perPage,
      page,
      sortBy: sortOptions.sortBy,
      direction: direction || 'desc',
    },
    records: populatedRecords.map((record) => record.toJSON(context.currentAdmin)),
    // Note: Returning owner record as "record" is a workaround so that "record" type action
    // doesn't throw an error about "record" being required
    record: context.record?.toJSON(context.currentAdmin),
  };
};
