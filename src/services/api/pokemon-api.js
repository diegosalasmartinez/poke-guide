import { apiGet } from './api'
const path = "pokemon"

const getPokemons = async (pagination) => {
    return await apiGet(`${path}?offset=${pagination.offset}&limit=${pagination.limit}`);
}

export { 
    getPokemons
}
