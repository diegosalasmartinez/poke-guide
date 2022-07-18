import { 
    GET_BERRIES,
    GET_BERRY_BY_NAME_OR_ID,
    SET_ACTUAL_BERRY,
    CLEAR_STATE_BERRY,
    ERROR_BERRY
} from '../actions/actionTypes/berryActionTypes'
import BerryModel from '../../models/BerryModel';

const initialState = {
    berries: [],
    count: 0,
    actualPage: [],
    actualBerry: new BerryModel(),
    errorMessage: "",
    isLoading: true,
    failed: false
};

const berry = (state = initialState, action) => {    
    switch(action.type){
        case GET_BERRIES:
            return {...state, berries: [...action.playload.berries], actualPage: {...action.playload.pagination}, count: action.playload.count, isLoading: false, failed: false};
        case GET_BERRY_BY_NAME_OR_ID:
        case SET_ACTUAL_BERRY:
            return {...state, actualBerry: {...action.playload}, isLoading: false, failed: false};
        case ERROR_BERRY:
            return {...state, isLoading: false, failed: true, errorMessage: action.playload};
        case CLEAR_STATE_BERRY:
            return {...state, isLoading: true, failed: false, errorMessage: ""};
        default:
            return {...state};
    }
}

export default berry