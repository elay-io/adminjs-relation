import { ActionQueryParameters, ActionContext, RecordJSON } from 'adminjs';
import { c as RelationLoaderHandlerConfig, O as OneToManyRelationOptions } from '../../index-Di23omGm.mjs';

/**
 * Handles fetching records for one-to-many relationships
 * @param {string} recordId - ID of the owner record
 * @param {object} params - Handler parameters
 * @param {object} params.relation - Relation configuration
 * @param {object} params.targetResource - Target resource instance
 * @param {object} [queryParams={}] - Query parameters for filtering and pagination
 * @param {object} context - AdminJS action context
 * @returns {Promise<object>} Records and metadata for the relation
 */
declare const oneToManyHandler: (recordId: string, { relation, targetResource }: RelationLoaderHandlerConfig<OneToManyRelationOptions>, queryParams: ActionQueryParameters | undefined, context: ActionContext) => Promise<{
    meta: {
        total: number;
        perPage: number;
        page: number;
        direction: any;
        sortBy: any;
    };
    records: RecordJSON[];
    record: RecordJSON | undefined;
}>;

export { oneToManyHandler };
