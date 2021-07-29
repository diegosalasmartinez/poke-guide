const arrayToMap = (arr) => {
    return arr.reduce(function(map, obj) {
        map[obj.id] = obj;
        return map;
    }, {});
}

const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const statsList = ["HP", "Att", "Def", "S.Att", "S.Def", "Spd"]

export { 
    arrayToMap,
    capitalize,
    statsList
}