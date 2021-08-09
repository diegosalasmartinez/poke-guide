import { apiGet } from './api'
const path = "pokemon"
const path2 = "pokemon-form"

const getPokemons = async (pagination) => {
    return await apiGet(`${path}?offset=${pagination.offset}&limit=${pagination.limit}`);
}

const getPokemonsBasicInfo = async (pagination) => {
    return await apiGet(`${path2}?offset=${pagination.offset}&limit=${pagination.limit}`);
}

const getPokemonByName = async (name) => {
    return await apiGet(`${path}/${name}`);
}

export { 
    getPokemons,
    getPokemonsBasicInfo,
    getPokemonByName
}
