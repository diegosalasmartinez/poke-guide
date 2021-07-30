import axios from 'axios'
const apiUrl = "https://pokeapi.co/api/v2";

export function generateUrl(path) {
	return apiUrl + '/'+ path;
}

export function apiReq(endPoint, data, method, headers, requestOptions = {}) {
	return new Promise((res, rej) => {
		headers = { ...headers }
		if (method === 'get' || method === 'delete') {
			data = {
				...requestOptions,
				params: data,
				headers
			}
		}
		
		axios[method](endPoint, data, { headers })
			.then((result) => {
                let { data } = result;
                if (data.status === false) {
                    return rej(data);
                }
			    return res(data);
		    })
            .catch((err) => { return rej(err) });
	})
}

export function apiPost(endPoint, data, headers = {}) {
	return apiReq(generateUrl(endPoint), data, 'post', headers);
}

export function apiDelete(endPoint, data, headers = {}) {
	return apiReq(generateUrl(endPoint), data, 'delete', headers);
}

export function apiGet(endPoint, data, headers = {}, requestOptions) {
	return apiReq(generateUrl(endPoint), data, 'get', headers, requestOptions);
}

export function apiPatch(endPoint, data, headers = {}) {
	return apiReq(generateUrl(endPoint), data, 'patch', headers);
}

export function apiCustom(endPoint) {
	return apiReq(endPoint, {}, 'get', {});
}