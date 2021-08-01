import { 
    GET_POKEMONS,
    GET_POKEMON_BY_NAME,
    CLEAR_STATE_POKEMON,
    ERROR_POKEMON
} from './actionTypes/pokemonActionTypes'
import { 
    getPokemons as getPokemonsAPI,
    getPokemonByName as getPokemonByNameAPI
} from '../../api/pokemon-api'
import { apiCustom } from '../../api/api'

const getPokemons = (pagination) => async (dispatch) => {
    try{
        const res = await getPokemonsAPI(pagination);
        if(res){
            const count = res.count;
            let pokemons = [];
            for(let i=0; i<res.results.length; i++){
                const newPokemon = await apiCustom(res.results[i].url);
                pokemons = [...pokemons, {...newPokemon}];
            }
            return dispatch({
                type: GET_POKEMONS,
                playload: {pokemons, pagination, count}
            })
        }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+GET_POKEMONS);
        console.log(e.response.status);
    }
    return dispatch({
        type: ERROR_POKEMON,
        playload: false
    })
}

const getPokemonByName = (pokemonName) => async (dispatch) => {
    let status;
    try{
        const res = await getPokemonByNameAPI(pokemonName);
        if(res){
            return dispatch({
                type: GET_POKEMON_BY_NAME,
                playload: res
            })
        }
    } catch(e){
        console.log(e);
        status = e.response.status;
        console.log('ERROR! '+GET_POKEMON_BY_NAME);
    }
    return dispatch({
        type: ERROR_POKEMON,
        playload: status === 404 ? 'El pokemón no existe' : 'Hubo un error al conectarnos con el servidor'
    })
}

const clearStatePokemon = () => async (dispatch) => {
    return dispatch({type: CLEAR_STATE_POKEMON})
}

export { 
    getPokemons,
    getPokemonByName,
    clearStatePokemon
}
