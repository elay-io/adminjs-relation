import { AppError, Filter, populator, SortSetter } from "adminjs";
import { Messages } from "../../constants/messages.js";

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
export const oneToManyHandler = async (
    recordId,
    { relation, targetResource },
    queryParams = {},
    context
) => {
    const {
        sortBy,
        direction = "asc",
        filters = {},
        perPage = context._admin.options.settings?.defaultPerPage || 10,
        page = 1
    } = queryParams;

    // Validate join key configuration
    if (!relation.target.joinKey) {
        throw new AppError(Messages.JoinKeyMissing);
    }

    // Add owner record ID to filters
    filters[relation.target.joinKey] = recordId;

    // Get list properties and find sortable property
    const listProperties = targetResource.decorate().getListProperties();
    const sortableProperty = listProperties.find(
        property => property.isSortable()
    );

    // Set up sorting options
    let sortOptions;
    if (sortableProperty) {
        sortOptions = SortSetter(
            { sortBy, direction },
            sortableProperty.name(),
            targetResource.decorate().options
        );
    }

    // Build filter and pagination options
    const filter = new Filter(filters, targetResource);
    const paginationOptions = {
        limit: perPage,
        offset: (page - 1) * perPage,
        sort: sortOptions
    };

    // Fetch records with pagination
    const records = await targetResource.find(
        filter,
        paginationOptions,
        context
    );

    // Populate related data
    const populatedRecords = await populator(records, context);
    context.records = populatedRecords;

    // Get total count for pagination
    const totalRecords = await targetResource.count(filter, context);

    return {
        meta: {
            total: totalRecords,
            perPage,
            page,
            direction: sortOptions?.direction,
            sortBy: sortOptions?.sortBy
        },
        records: populatedRecords.map(record => 
            record.toJSON(context.currentAdmin)
        ),
        // Note: Returning owner record as "record" is a workaround so that "record" type action
        // doesn't throw an error about "record" being required
        record: context.record?.toJSON(context.currentAdmin)
    };
};