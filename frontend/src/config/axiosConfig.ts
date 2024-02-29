import axios from 'axios';
import { SERVER_URL } from './config';

const baseURL = SERVER_URL
  
const instance = axios.create({
  baseURL,
  withCredentials: true,
});

instance.interceptors.request.use( request => {
  const token = localStorage.getItem('token');
  request.headers.Authorization = token ? `Bearer ${token}` : null;
  return request;
}, function (error) {
  return Promise.reject(error);
});


instance.interceptors.response.use(
  response => {
    return response;
  }, 
  async (error) => {
    const { config: originalRequest, response } = error;
    if ( 
      response.status === 401 && 
        !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const { data: { token } } = await instance.get('/api/auth/refresh');
        localStorage.setItem('token', token);
        return await instance.request(originalRequest);
      } catch (error) {
        
      }
    }
    return Promise.reject(error);
  },
);



export default instance;