const arrayToMap = (arr) => {
    return arr.reduce(function(map, obj) {
        map[obj.id] = obj;
        return map;
    }, {});
}

const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const equalPagination = (pageLocalStorage, actualPage) => {
    if(!pageLocalStorage) return false;
    return pageLocalStorage.offset === actualPage.offset && pageLocalStorage.limit === actualPage.limit;
}

const statsList = ["HP", "Att", "Def", "S.Att", "S.Def", "Spd"]

export { 
    arrayToMap,
    capitalize,
    equalPagination,
    statsList
}