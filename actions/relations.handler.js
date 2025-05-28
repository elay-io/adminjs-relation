/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppError, flat } from "adminjs";
import { Messages } from "../constants/messages.js";
import { RelationType } from "../types/index.js";
import { manyToManyHandler } from "./many-to-many/many-to-many.handler.js";
import { oneToManyHandler } from "./one-to-many/one-to-many.handler.js";

/**
 * Handler for finding relations between resources
 * @param {object} config - Configuration object
 * @param {object} config.relations - Relations configuration map
 * @returns {Function} Handler function for finding relations
 */
export const findRelationHandler = ({ relations }) => 
    async (request, response, context) => {
        const { 
            resource: ownerResource,
            _admin: adminInstance
        } = context;

        const { query } = request;
        const { recordId } = request.params;

        // Validate record ID
        if (!recordId) {
            throw new AppError(Messages.MissingRecordId);
        }

        // Parse query parameters
        const queryParams = flat.unflatten(query || {});
        const { relation: relationName } = queryParams;

        // Get relation configuration
        const relationConfig = relations[relationName];
        if (!relationConfig) {
            throw new AppError(
                Messages.MissingConfiguration,
                undefined,
                { options: { relationName } }
            );
        }

        // Find target resource
        const targetResource = adminInstance.findResource(
            relationConfig.target.resourceId
        );

        // Common parameters for handlers
        const handlerParams = {
            targetResource,
            ownerResource,
            relation: relationConfig
        };

        // Handle different relation types
        switch (relationConfig.type) {
            case RelationType.OneToMany:
                return oneToManyHandler(
                    recordId,
                    handlerParams,
                    queryParams,
                    context
                );

            case RelationType.ManyToMany:
                return manyToManyHandler(
                    recordId,
                    handlerParams,
                    queryParams,
                    context
                );

            default:
                throw new AppError(
                    Messages.InvalidRelationType,
                    undefined,
                    { 
                        options: { 
                            validTypes: Object.values(RelationType).join(", ") 
                        } 
                    }
                );
        }
    };