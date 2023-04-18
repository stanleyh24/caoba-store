import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import { API_URL } from "../constants/env";


const jwtInterceptor = axios.create({});


jwtInterceptor.interceptors.request.use(async (config) => {
   
    let tokensData = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;
    
    const u = jwt_decode(tokensData?.access)
    const isExpired = dayjs.unix(u.exp).diff(dayjs()) < 1;

   /*  if (isExpired) {
      const response = await axios.post(`${API_URL}/auth/refresh`,{
        refresh: tokensData.refresh
      })
      console.log(response)
      //user.setTokens()
    } */
    
    config.headers.Authorization = `bearer ${tokensData?.access}`;

    return config;
  });

  jwtInterceptor.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) =>{
      if (error.response.status === 401) {
        let tokensData = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;
        let apiResponse = await axios.post(`${API_URL}/auth/refresh`,{
          headers: {
            Authorization: `Bearer ${tokensData.refresh}`,
          },
        });

        console.log(apiResponse.data);
        error.config.headers[
          "Authorization"
        ] = `bearer ${apiResponse.data.access}`;

        return axios(error.config);
      } else {
        return Promise.reject(error)
      }

      
    }
    )
export default jwtInterceptor;