const typesList = [
    {
        name: "normal",
        url: "https://pokeapi.co/api/v2/type/1/"
    },
    {
        name: "fighting",
        url: "https://pokeapi.co/api/v2/type/2/"
    },
    {
        name: "flying",
        url: "https://pokeapi.co/api/v2/type/3/"
    },
    {
        name: "poison",
        url: "https://pokeapi.co/api/v2/type/4/"
    },
    {
        name: "ground",
        url: "https://pokeapi.co/api/v2/type/5/"
    },
    {
        name: "rock",
        url: "https://pokeapi.co/api/v2/type/6/"
    },
    {
        name: "bug",
        url: "https://pokeapi.co/api/v2/type/7/"
    },
    {
        name: "ghost",
        url: "https://pokeapi.co/api/v2/type/8/"
    },
    {
        name: "steel",
        url: "https://pokeapi.co/api/v2/type/9/"
    },
    {
        name: "fire",
        url: "https://pokeapi.co/api/v2/type/10/"
    },
    {
        name: "water",
        url: "https://pokeapi.co/api/v2/type/11/"
    },
    {
        name: "grass",
        url: "https://pokeapi.co/api/v2/type/12/"
    },
    {
        name: "electric",
        url: "https://pokeapi.co/api/v2/type/13/"
    },
    {
        name: "psychic",
        url: "https://pokeapi.co/api/v2/type/14/"
    },
    {
        name: "ice",
        url: "https://pokeapi.co/api/v2/type/15/"
    },
    {
        name: "dragon",
        url: "https://pokeapi.co/api/v2/type/16/"
    },
    {
        name: "dark",
        url: "https://pokeapi.co/api/v2/type/17/"
    },
    {
        name: "fairy",
        url: "https://pokeapi.co/api/v2/type/18/"
    },
    {
        name: "unknown",
        url: "https://pokeapi.co/api/v2/type/10001/"
    },
    {
        name: "shadow",
        url: "https://pokeapi.co/api/v2/type/10002/"
    }
]

const getColorType = (type) => {
    switch(type){
        case "normal":
            return "#CCC9AA";
        case "fighting":
            return "#800B11";
        case "flying":
            return "#5EB9B2";
        case "poison":
            return "#611380";
        case "ground":
            return "#E1D158";
        case "rock":
            return "#94834F";
        case "bug":
            return "#BDDD6E";
        case "ghost":
            return "#8E55A4";
        case "steel":
            return "#BBC5C4";
        case "fire":
            return "#FC0C0B";
        case "water":
            return "#08517A";
        case "grass":
            return "#3E9709";
        case "electric":
            return "#FFFA24";
        case "psychic":
            return "#EC0E63";
        case "ice":
            return "#66D1E5";
        case "dragon":
            return "#29036A";
        case "dark":
            return "#2D221C";
        case "fairy":
            return "#F87EA7";
        case "unknown":
            return "#000000";
        case "shadow":
            return "#000000";
        default: 
            return "#000000"
    }
}

export {
    getColorType,
    typesList
}