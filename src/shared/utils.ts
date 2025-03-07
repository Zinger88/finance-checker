export function groupByCategory(object: any, field: string) {
    const objectMap = new Map();
    for (const item of object) {
        const category = item[field]?.replace(/['"]+/g, '');

        if (!objectMap.has(category)) {
            objectMap.set(category, []);
        }
        objectMap.get(category).push(item);
    }

    return Object.fromEntries(objectMap);
}

export function arrayToObject(array: any[], keyField = 'id') {
    return array.reduce((acc, item) => {
        const key = item[keyField];
        if (key !== undefined) {
            acc[key] = item;
        }
        return acc;
    }, {});
}
