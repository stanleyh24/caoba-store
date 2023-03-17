import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { API_URL } from "../../constants/env"


let originalRequest= async (url, config) => {
    let response = await fetch(url, config)
    let data = await response.json()
    return {response, data}
}
let refreshToken = async (authTokens) => {
    let response = await fetch(`${API_URL}/auth/refresh`,{
        method:'POST',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body:JSON.stringify({'refresh':authTokens.refresh})
    })
    let data = await response.json()
    localStorage.setItem('authTokens', JSON.stringify(data))
    return data
}

let customFetcher = async (url, config={}) => {
    let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null

    const user = jwt_decode(authTokens.access)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (isExpired){
        authTokens = await refreshToken(authTokens)
    }

    config['headers'] = {
        Autorization :`Bearer ${authTokens?.access}`
    }

    let {response, data} = originalRequest(url, config)
    return {response, data}
}

export default customFetcher;