import {
    GET_ITEMS,
    GET_ITEM_BY_NAME_OR_ID,
    SET_ACTUAL_ITEM,
    CLEAR_STATE_ITEM,
    ERROR_ITEM
} from '../actions/actionTypes/itemActionTypes'
import ItemModel from '../../models/ItemModel'

const initialState = {
    items: [],
    count: 0,
    actualPage: [],
    actualItem: new ItemModel(),
    errorMessage: "",
    isLoading: true,
    failed: false
};

const item = (state = initialState, action) => {    
    switch(action.type){
        case GET_ITEMS:
            return {...state, items: [...action.playload.items], actualPage: {...action.playload.pagination}, count: action.playload.count, isLoading: false, failed: false};
        case GET_ITEM_BY_NAME_OR_ID:
        case SET_ACTUAL_ITEM:
            return {...state, actualItem: {...action.playload}, isLoading: false, failed: false};
        case ERROR_ITEM:
            return {...state, isLoading: false, failed: true, errorMessage: action.playload};
        case CLEAR_STATE_ITEM:
            return {...state, isLoading: true, failed: false, errorMessage: ""};
        default:
            return {...state};
    }
}

export default item