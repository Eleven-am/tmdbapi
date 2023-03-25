"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDates = void 0;
function createDates(data) {
    let obj = data;
    for (let key in obj) {
        if (typeof obj[key] === 'string') {
            const isDate = !isNaN(Date.parse(obj[key]));
            if (isDate && obj[key].length >= 10) {
                obj[key] = new Date(obj[key]);
            }
        }
        else if (typeof obj[key] === 'object') {
            createDates(obj[key]);
        }
        else if (Array.isArray(obj[key])) {
            obj[key].forEach((item) => createDates(item));
        }
    }
    return obj;
}
exports.createDates = createDates;
