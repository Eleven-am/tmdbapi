"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unwrapOrNull = exports.hasData = exports.hasError = void 0;
/**
 * Checks if the response is an error, returns true if it is
 * @param response - The response to check
 */
function hasError(response) {
    return response.error !== undefined;
}
exports.hasError = hasError;
/**
 * Checks if the response has data, returns true if it does
 * @param response - The response to check
 */
function hasData(response) {
    return response.data !== undefined;
}
exports.hasData = hasData;
/**
 * Unwraps the data from the response, returns null if there is no data
 * @param response - The response to unwrap
 */
function unwrapOrNull(response) {
    if (hasData(response)) {
        return response.data;
    }
    return null;
}
exports.unwrapOrNull = unwrapOrNull;
