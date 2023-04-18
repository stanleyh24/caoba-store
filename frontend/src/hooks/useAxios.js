import jwt_decode from "jwt-decode";
import dayjs from 'dayjs';
import axios from 'axios'
import { useUserContext } from '../context/UserContext';
import { API_URL } from '../constants/env';

const baseURL = API_URL


const useAxios = () => {
    //const {authTokens, setUser, setAuthTokens} = useContext(AuthContext)
    const user = useUserContext()
    
    const axiosInstance = axios.create({
        baseURL,
        headers:{Authorization: `Bearer ${user.authTokens?.access}`}
    });


    axiosInstance.interceptors.request.use(async req => {
    
        const u = jwt_decode(user.authTokens.access)
        const isExpired = dayjs.unix(u.exp).diff(dayjs()) < 1;
    
        if(!isExpired) {
            return req
        }
        
        const response = await axios.post(`${baseURL}/auth/refresh`,{
            headers: {
                Authorization: `Bearer ${user.authTokens?.refresh}`
            },
            body:{}
    
        });
        console.log(response.data);
        //localStorage.setItem('authTokens', JSON.stringify(response.data))
        
        setAuthTokens(response.data)
        setUser(jwt_decode(response.data.access))
        
        req.headers.Authorization = `Bearer ${response.data.access}`
        return req
    })
    
    return axiosInstance
}

export default useAxios;