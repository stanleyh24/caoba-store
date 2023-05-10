import jwt_decode from "jwt-decode";
import dayjs from 'dayjs';
import { useUserContext } from '../context/UserContext';
import { API_URL } from '../constants/env';



let useAdminFetch = () => {
    const user = useUserContext()
    let config = {}
    const baseURL = API_URL

    let originalRequest = async (url, config) => {
        url = `${baseURL}${url}`
        let response = await fetch(url, config)
        let data = await response.json()
        return {response,data}
    }

    let refreshToken = async () => {
        
        let response = await fetch(`${baseURL}/auth/refresh`,{
            method: 'POST',
            headers: {
                Authorization:`Bearer ${user.authTokens?.refresh}`
            }
        })

        let data = await response.json()
        
        user.updateToken(data.access)
        return data
    }

    return async (url, conf) => {
            const u = jwt_decode(user.authTokens.access)
            const isExpired = dayjs.unix(u.exp).diff(dayjs()) < 1;
            config= conf
                
            if (isExpired) {
                let refreshedToken = await refreshToken()
                config['headers'] = {...conf['headers'],Authorization:`Bearer ${refreshedToken.access}`}
            } else {
                config['headers'] = {...conf['headers'],Authorization:`Bearer ${user.authTokens?.access}`}

            }
            let {response, data} = await originalRequest(url, config)
            return {response, data}
        };
}

export default useAdminFetch