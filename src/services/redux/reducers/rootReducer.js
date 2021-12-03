import { combineReducers } from 'redux'
import pokemon from './pokemonReducer'
import item from './itemReducer'

const rootReducer = combineReducers({
    pokemon,
    item
})

export default rootReducer
