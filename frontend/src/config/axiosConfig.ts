import axios from 'axios';

const baseURL = process.env.NODE_ENV === "development"
  ? "http://localhost:4000/"
  : "http://example.com"


const instance = axios.create({
    baseURL,
    withCredentials: true,
})

instance.interceptors.request.use( request => {
  const token = localStorage.getItem("token")
  request.headers.Authorization = token ? `Bearer ${token}` : null
  return request
}, function (error) {
  return Promise.reject(error);
});


instance.interceptors.response.use(
  response => {
    return response
  }, 
  async (error) => {
    const { config: originalRequest, response } = error
     if ( 
        response.status === 401 && 
        !originalRequest._isRetry
     ) {
      originalRequest._isRetry = true
       try {
         const { data: { token }} = await instance.get("/api/auth/refresh");
         localStorage.setItem("token", token)
         return instance.request(originalRequest)
       } catch (error) {
         console.log("AUTH ERROR");
       }
     }
     return Promise.reject(error);
   }
)



export default instance;