import { 
    GET_POKEMONS,
    GET_POKEMON_BY_NAME,
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

export { 
    getPokemons
}
