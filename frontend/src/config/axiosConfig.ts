import axios from 'axios';

const baseURL = process.env.NODE_ENV === "development"
  ? "http://localhost:4000/"
  : "http://example.com"

const app = axios.create({
    baseURL,
    // withCredentials: true,
    withXSRFToken: true
})

app.interceptors.response.use(
  response => (response), 
  error => (Promise.reject(error.response.data.err))
)

export default app;