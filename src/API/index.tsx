import axios from "axios";

type actionItem = {
    url: string,
    method: string
}

const callApi = async (action: actionItem, payload: object) => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const res = axios({
        method: action.method,
        url: baseUrl + action.url,
        data: payload
    })
        .then(res => res.data)
    return await res
}

export default callApi