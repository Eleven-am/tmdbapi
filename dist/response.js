"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unwrapOrNull = exports.hasData = exports.hasError = void 0;
function hasError(response) {
    return response.error !== undefined;
}
exports.hasError = hasError;
function hasData(response) {
    return response.data !== undefined;
}
exports.hasData = hasData;
function unwrapOrNull(response) {
    if (hasData(response)) {
        return response.data;
    }
    return null;
}
exports.unwrapOrNull = unwrapOrNull;
