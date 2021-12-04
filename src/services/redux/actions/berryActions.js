import { 
    GET_BERRIES,
    GET_BERRY_BY_NAME_OR_ID,
    GET_ALL_BERRY,
    SET_ACTUAL_BERRY,
    CLEAR_STATE_BERRY,
    ERROR_BERRY
} from './actionTypes/berryActionTypes'
import { 
    getBerries as getBerriesAPI,
    getBerryByNameOrId as getBerryByNameOrIdAPI
} from '../../api/berry-api'
import { apiCustom } from '../../api/api'

const getAllBerries = () => async (dispatch) => {
    try{
        let res = await getBerriesAPI();
        let berries = [];
        if (res) {
            while (true) {
                for (let i=0; i<res.results.length; i++){
                    berries = [...berries, res.results[i].name];
                }

                if (!res.next) break;
                res = await apiCustom(res.next);
            }
            return dispatch({
                type: GET_ALL_BERRY,
                playload: berries
            })
        }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+GET_ALL_BERRY);
        console.log(e.response.status);
    }
    return dispatch({
        type: ERROR_BERRY,
        playload: false
    })
}

const getBerries = (pagination) => async (dispatch) => {
    try{
        const res = await getBerriesAPI(pagination);
        if(res){
            const count = res.count;
            let berries = [];
            for (let i=0; i<res.results.length; i++) {
                let newBerry = await apiCustom(res.results[i].url);
                const itemInfo = await apiCustom(newBerry.item.url);
                newBerry = {...newBerry, item: {...itemInfo}};
                berries = [...berries, {...newBerry}];
            }
            return dispatch({
                type: GET_BERRIES,
                playload: {berries, pagination, count}
            })
        }
    } catch(e){
        console.log(e);
        console.log('ERROR! '+GET_BERRIES);
        console.log(e.response.status);
    }
    return dispatch({
        type: ERROR_BERRY,
        playload: false
    })
}

const getBerryByNameOrId = (name) => async (dispatch) => {
    try{
        let res = await getBerryByNameOrIdAPI(name);
        const itemInfo = await apiCustom(res.item.url);
        res = {...res, item: {...itemInfo}};
        console.log(res);
        return dispatch({
            type: GET_BERRY_BY_NAME_OR_ID,
            playload: res
        })
    } catch(e){
        console.log(e);
        console.log('ERROR! '+GET_BERRY_BY_NAME_OR_ID);
        console.log(e.response.status);
    }
    return dispatch({
        type: ERROR_BERRY,
        playload: false
    })
}

const setActualBerry = (berry) => async (dispatch) => {
    return dispatch({type: SET_ACTUAL_BERRY, playload: berry})
}

const clearStateBerry = () => async (dispatch) => {
    return dispatch({type: CLEAR_STATE_BERRY})
}

export { 
    getAllBerries,
    getBerries,
    getBerryByNameOrId,
    setActualBerry,
    clearStateBerry
}
