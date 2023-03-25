"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasError = exports.hasData = exports.TmDBApi = void 0;
const tmDB_1 = require("./tmDB");
Object.defineProperty(exports, "TmDBApi", { enumerable: true, get: function () { return tmDB_1.TmDBApi; } });
const response_1 = require("./response");
Object.defineProperty(exports, "hasData", { enumerable: true, get: function () { return response_1.hasData; } });
Object.defineProperty(exports, "hasError", { enumerable: true, get: function () { return response_1.hasError; } });
