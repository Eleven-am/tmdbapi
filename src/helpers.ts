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

export function levenshtein(str1: string, str2: string) {
    let a = str1.toLowerCase();
    let b = str2.toLowerCase() + "", m = [], i, j, min = Math.min;

    if (!(a && b)) return (b || a).length;

    for (i = 0; i <= b.length; m[i] = [i++]) ;
    for (j = 0; j <= a.length; m[0][j] = j++) ;

    for (i = 1; i <= b.length; i++)
        for (j = 1; j <= a.length; j++)
            m[i][j] = b.charAt(i - 1) === a.charAt(j - 1) ? m[i - 1][j - 1] : m[i][j] = min(m[i - 1][j - 1] + 1, min(m[i][j - 1] + 1, m[i - 1][j] + 1))

    return m[b.length][a.length];
}
