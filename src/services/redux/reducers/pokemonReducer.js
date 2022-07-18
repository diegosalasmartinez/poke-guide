import {
    GET_POKEMONS,
    GET_POKEMON_BY_NAME,
    CLEAR_STATE_POKEMON,
    ERROR_POKEMON
} from '../actions/actionTypes/pokemonActionTypes'
import PokemonModel from '../../models/PokemonModel';

const initialState = {
    pokemons: [],
    count: 0,
    actualPage: [],
    actualPokemon: new PokemonModel(),
    errorMessage: "",
    isLoading: true,
    failed: false
};

const pokemon = (state = initialState, action) => {    
    switch(action.type){
        case GET_POKEMONS:
            return {...state, pokemons: [...action.playload.pokemons], actualPage: {...action.playload.pagination}, count: action.playload.count, isLoading: false, failed: false};
        case GET_POKEMON_BY_NAME:
            return {...state, actualPokemon: {...action.playload}, isLoading: false, failed: false};
        case ERROR_POKEMON:
            return {...state, isLoading: false, failed: true, errorMessage: action.playload};
        case CLEAR_STATE_POKEMON:
            return {...state, isLoading: true, failed: false, errorMessage: ""};
        default:
            return {...state};
    }
}

export default pokemon