import { combineReducers } from 'redux'
import pokemon from './pokemonReducer'
import item from './itemReducer'
import berry from './berryReducer'

const rootReducer = combineReducers({
    pokemon,
    item,
    berry
})

export default rootReducer
