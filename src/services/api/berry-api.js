import { apiGet } from './api'
const path = "berry"

const getBerries = async (pagination) => {
    if (pagination) {
        return await apiGet(`${path}?offset=${pagination.offset}&limit=${pagination.limit}`);
    } else {
        return await apiGet(`${path}`);
    }
}

const getBerryByNameOrId = async (obj) => {
    return await apiGet(`${path}/${obj}`);
}

export {
    getBerries,
    getBerryByNameOrId
}
