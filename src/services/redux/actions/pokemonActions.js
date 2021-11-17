import { 
    GET_POKEMONS,
    GET_POKEMON_BY_NAME,
    GET_ALL_POKEMON,
    CLEAR_STATE_POKEMON,
    ERROR_POKEMON
} from './actionTypes/pokemonActionTypes'
import { 
    getPokemons as getPokemonsAPI,
    getPokemonsBasicInfo as getPokemonsBasicInfoAPI,
    getPokemonByName as getPokemonByNameAPI
} from '../../api/pokemon-api'
import { apiCustom } from '../../api/api'

const getAllPokemonName = () => async (dispatch) => {
    try{
        let res = await getPokemonsBasicInfoAPI();
        let pokemons = [];
        if (res) {
            
            while (true) {
                for (let i=0; i<res.results.length; i++){
                    pokemons = [...pokemons, res.results[i].name];
                }

                if (!res.next) break;
                res = await apiCustom(res.next);
            }
            return dispatch({
                type: GET_ALL_POKEMON,
                playload: pokemons
            })
        }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+GET_ALL_POKEMON);
        console.log(e.response.status);
    }
    return dispatch({
        type: ERROR_POKEMON,
        playload: false
    })
}

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

const getPokemonsBasicInfo = (pagination) => async (dispatch) => {
    try{
        const res = await getPokemonsBasicInfoAPI(pagination);
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
        let res = await getPokemonByNameAPI(pokemonName);
        const speciesInfo = await apiCustom(res.species.url);
        res.species = {...speciesInfo};
        
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
        playload: status === 404 ? 'We couldn\'t find that pokemon. Try with another one' : 'There was a problem with the server'
    })
}

const clearStatePokemon = () => async (dispatch) => {
    return dispatch({type: CLEAR_STATE_POKEMON})
}

export { 
    getPokemons,
    getAllPokemonName,
    getPokemonsBasicInfo,
    getPokemonByName,
    clearStatePokemon
}
