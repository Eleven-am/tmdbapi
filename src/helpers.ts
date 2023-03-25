export function createDates<DataType>(data: DataType) {
    let obj: any = data;
    for (let key in obj) {
        if (typeof obj[key] === 'string') {
            const isDate = !isNaN(Date.parse(obj[key]));
            if (isDate && obj[key].length >= 10) {
                obj[key] = new Date(obj[key]);
            }
        } else if (typeof obj[key] === 'object') {
            createDates(obj[key]);
        } else if (Array.isArray(obj[key])) {
            obj[key].forEach((item: any) => createDates(item));
        }
    }

    return obj;
}