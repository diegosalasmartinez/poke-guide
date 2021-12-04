import { 
    GET_ITEMS,
    GET_ITEM_BY_NAME_OR_ID,
    GET_ALL_ITEM,
    SET_ACTUAL_ITEM,
    CLEAR_STATE_ITEM,
    ERROR_ITEM
} from './actionTypes/itemsActionTypes'
import { 
    getItems as getItemsAPI,
    getItemByNameOrId as getItemByNameOrIdAPI
} from '../../api/item-api'
import { apiCustom } from '../../api/api'

const getAllItems = () => async (dispatch) => {
    try{
        let res = await getItemsAPI();
        let items = [];
        if (res) {
            while (true) {
                for (let i=0; i<res.results.length; i++){
                    items = [...items, res.results[i].name];
                }

                if (!res.next) break;
                res = await apiCustom(res.next);
            }
            return dispatch({
                type: GET_ALL_ITEM,
                playload: items
            })
        }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+GET_ALL_ITEM);
        console.log(e.response.status);
    }
    return dispatch({
        type: ERROR_ITEM,
        playload: false
    })
}

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
        console.log(res);
        return dispatch({
            type: GET_ITEM_BY_NAME_OR_ID,
            playload: res
        })
    } catch(e){
        console.log(e);
        console.log('ERROR! '+GET_ITEM_BY_NAME_OR_ID);
        console.log(e.response.status);
    }
    return dispatch({
        type: ERROR_ITEM,
        playload: false
    })
}

const setActualItem = (item) => async (dispatch) => {
    return dispatch({type: SET_ACTUAL_ITEM, playload: item})
}

const clearStateItem = () => async (dispatch) => {
    return dispatch({type: CLEAR_STATE_ITEM})
}

export { 
    getAllItems,
    getItems,
    getItemByNameOrId,
    setActualItem,
    clearStateItem
}
