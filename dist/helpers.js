"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDates = createDates;
exports.groupByLength = groupByLength;
function createDates(data) {
    let obj = data;
    for (let key in obj) {
        if (typeof obj[key] === 'string') {
            const regex = new RegExp(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?Z)?$/);
            const isDate = !isNaN(Date.parse(obj[key]));
            if (isDate && regex.test(obj[key])) {
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
function groupByLength(arr, length) {
    const groups = [];
    let i = 0;
    while (i < arr.length) {
        groups.push(arr.slice(i, i += length));
    }
    return groups;
}
