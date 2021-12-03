import { apiGet } from './api'
const path = "item"

const getItems = async (pagination) => {
    if (pagination) {
        return await apiGet(`${path}?offset=${pagination.offset}&limit=${pagination.limit}`);
    } else {
        return await apiGet(`${path}`);
    }
}

const getItemByNameOrId = async (obj) => {
    return await apiGet(`${path}/${obj}`);
}

export {
    getItems,
    getItemByNameOrId
}
