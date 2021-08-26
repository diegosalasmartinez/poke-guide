import { apiGet } from './api'
const path = "pokemon"
const pathForm = "pokemon-form"
const pathSpecies = "pokemon-species"

const getPokemons = async (pagination) => {
    return await apiGet(`${path}?offset=${pagination.offset}&limit=${pagination.limit}`);
}

const getPokemonsBasicInfo = async (pagination) => {
    return await apiGet(`${pathForm}?offset=${pagination.offset}&limit=${pagination.limit}`);
}

const getPokemonSpeciesInfoByName = async (name) => {
    return await apiGet(`${pathSpecies}/${name}`);
}


const getPokemonByName = async (name) => {
    return await apiGet(`${path}/${name}`);
}

export { 
    getPokemons,
    getPokemonsBasicInfo,
    getPokemonSpeciesInfoByName,
    getPokemonByName
}
