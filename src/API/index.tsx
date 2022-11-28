import axios from "axios";

type actionItem = {
    url: string,
    method: string
}

const callApi = async (action: actionItem, payload: any) => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const res = axios({
        method: action.method,
        url: baseUrl + action.url,
    })
        .then(res => res.data)
    return await res
}

export default callApi