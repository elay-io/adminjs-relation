import isEmpty from "lodash/isEmpty.js";

/**
 * After hook for redirecting back to the owning resource details page
 * This hook is called after a record is created/updated to handle redirection
 * 
 * @param {object} response - Response from the previous action
 * @param {object} request - Request object containing query parameters
 * @returns {object} Modified response with redirect URL if applicable
 */
export const redirectToOwningResourceDetails = (response, request) => {
    // Skip redirect if there are validation errors
    if (!isEmpty(response.record?.errors)) {
        return response;
    }

    // Handle redirect if URL is provided
    if (request.query?.redirectUrl) {
        const redirectUrl = new URL(request.query.redirectUrl);
        
        // Remove redirectUrl from query params to avoid redirect loops
        redirectUrl.searchParams.delete("redirectUrl");
        
        // Set redirect URL in response
        response.redirectUrl = redirectUrl.pathname + redirectUrl.search;
    }

    return response;
};