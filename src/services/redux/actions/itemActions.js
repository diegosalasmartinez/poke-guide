import { 
    GET_ITEMS,
    GET_ITEM_BY_NAME_OR_ID,
    SET_ACTUAL_ITEM,
    CLEAR_STATE_ITEM,
    ERROR_ITEM
} from './actionTypes/itemActionTypes'
import { 
    getItems as getItemsAPI,
    getItemByNameOrId as getItemByNameOrIdAPI
} from '../../api/item-api'
import { apiCustom } from '../../api/api'

const getItems = (pagination) => async (dispatch) => {
    try{
        const res = await getItemsAPI(pagination);
        if(res){
            const count = res.count;
            let items = [];
            for (let i=0; i<res.results.length; i++) {
                const newItem = await apiCustom(res.results[i].url);
                items = [...items, {...newItem}];
            }
            return dispatch({
                type: GET_ITEMS,
                playload: {items, pagination, count}
            })
        }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+GET_ITEMS);
        console.log(e.response.status);
    }
    return dispatch({
        type: ERROR_ITEM,
        playload: false
    })
}

const getItemByNameOrId = (name) => async (dispatch) => {
    try{
        const res = await getItemByNameOrIdAPI(name);
        return dispatch({
            type: GET_ITEM_BY_NAME_OR_ID,
            playload: res
        })
    } catch(e){
        console.log(e);
        console.log('ERROR! '+GET_ITEM_BY_NAME_OR_ID);
    }
    return dispatch({
        type: ERROR_ITEM,
        playload: false
    })
}

const setActualItem = (item) => async (dispatch) => {
    return dispatch({type: SET_ACTUAL_ITEM, playload: item})
}

const setErrorItem = () => async (dispatch) => {
    return dispatch({type: ERROR_ITEM, playload: 'We couldn\'t find that item. Try with another one'})
}

const clearStateItem = () => async (dispatch) => {
    return dispatch({type: CLEAR_STATE_ITEM})
}

export { 
    getItems,
    getItemByNameOrId,
    setActualItem,
    setErrorItem,
    clearStateItem
}
