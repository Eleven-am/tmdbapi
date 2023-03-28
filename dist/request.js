"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRequest = void 0;
function getQueryString(url, query) {
    if (!query)
        return url;
    Object.entries(query).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            const values = value.filter(v => v !== undefined)
                .map(v => v === null ? 'null' : v.toString());
            if (values.length === 0)
                return;
            url.searchParams.append(key, values.join(','));
        }
        else {
            if (value === undefined)
                return;
            if (value === null) {
                value = 'null';
            }
            url.searchParams.append(key, value.toString());
        }
    });
    return url;
}
function makeRequest(request) {
    let body;
    const { method, headers, query, address } = request;
    const url = getQueryString(new URL(address), query);
    if (request.body && typeof request.body === 'object') {
        body = JSON.stringify(request.body);
    }
    return new Promise((resolve, reject) => {
        var _a;
        let address = '';
        let fetch = (_a = request.fetch) !== null && _a !== void 0 ? _a : window.fetch;
        try {
            address = url.toString();
        }
        catch (e) {
            reject(e);
        }
        fetch(address, {
            method,
            headers,
            body,
            signal: request.abortSignal
        })
            .then((response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const json = yield response.json();
                resolve(json);
            }
            catch (e) {
                try {
                    const text = yield response.text();
                    resolve(text);
                }
                catch (e) {
                    reject(e);
                }
            }
        }))
            .catch((e) => {
            reject(e);
        });
    });
}
exports.makeRequest = makeRequest;
