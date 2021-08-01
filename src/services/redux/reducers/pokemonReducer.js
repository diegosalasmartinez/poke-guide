import {
    GET_POKEMONS,
    GET_POKEMON_BY_NAME,
    ERROR_POKEMON    
} from '../actions/actionTypes/pokemonActionTypes'
import PokemonModel from '../../models/PokemonModel';

const initialState = {
    pokemons: [],
    count: 0,
    actualPage: [],
    actualPokemon: new PokemonModel(),
    isLoading: true,
    failed: false
};

const pokemon = (state = initialState, action) => {    
    switch(action.type){
        case GET_POKEMONS:
            return {...state, pokemons: [...action.playload.pokemons], actualPage: {...action.playload.pagination}, count: action.playload.count, isLoading: false, failed: false};
        default:
            return {...state};
    }
}

export default pokemon