import jwt_decode from "jwt-decode";
import dayjs from 'dayjs';
import { useUserContext } from '../context/UserContext';
import { API_URL } from '../constants/env';


let useAdminFetch = () => {
    let config = {}

    const user = useUserContext()

    let baseURL = API_URL

    let originalRequest = async (url, config)=> {
        url = `${baseURL}${url}`
        let response = await fetch(url, config)
        let data = await response.json()
        console.log('REQUESTING:', data)
        return {response, data}
    }

    let refreshToken = async () => {

        let response = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            mode: "cors",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': "Bearer " + user.authTokens.refresh
            },
        })
        let data = await response.json()
        updateToken(data.access)
        
        return user.authTokens
    }

    let callFetch = async (url) => {
        const user = jwt_decode(authTokens.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if(isExpired){
            auth = await refreshToken(authTokens)
        }

        
        config['headers'] = {
            Authorization:`Bearer ${auth?.access}`
        }

        let {response, data} = await originalRequest(url, config)
        return {response, data}
    }

    return callFetch
}

export default useAdminFetch;