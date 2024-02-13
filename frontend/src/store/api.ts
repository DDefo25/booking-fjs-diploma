import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query"
import { SERVER_URL } from "../config/config"
import instance from "../config/axiosConfig"
import { clearCredentials, setCredentials } from "../features/userSlice"
import { User } from "../interfaces/User.interface"

export interface LoginResponse {
    user: User
    token: string
  }
  
  export interface UserResponse {
    user: User
    token: string
  }
  
  export interface LogoutResponse {
    success: boolean
  }
  
  
  export interface LoginRequest {
    email: string
    password: string
  }
  
  export interface RegisterRequest {
    email: string, 
    name: string, 
    password: string, 
    contactPhone: string
  }

  

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
      baseUrl: `${SERVER_URL}/api/`
    }),
    endpoints: builder => ({
        getUser: builder.query({
            queryFn: async (arg) => {
                return {dsd: 'sfs'}
            }
        }),
      login: builder.mutation<UserResponse, LoginRequest>({
        queryFn: async (credentials, apiState) => {
          // apiState.dispatch(authInProgress())
          return instance
            .post('/api/auth/login', credentials)
            .then(response => {
              const { data: { user, token } } = response
              console.log({ user, token })
              localStorage.setItem('token', token )
              apiState.dispatch(setCredentials({ user, token }))
              return response
            })
        },
      }),
      register: builder.mutation<UserResponse, RegisterRequest>({
        queryFn: async (credentials, apiState) => {
          // apiState.dispatch(authInProgress())
          return instance
            .post('/api/auth/login', credentials)
            .then(response => {
              const { data: { user, token } } = response
              console.log({ user, token })
              localStorage.setItem('token', token )
              apiState.dispatch(setCredentials({ user, token }))
              return response
            })
        },
      }),
      logout: builder.mutation<LogoutResponse, void>({
        queryFn: async (_, apiState) => {
          // apiState.dispatch(authInProgress())
          return instance
            .post('/api/auth/logout')
            .then(response => {
              localStorage.removeItem('token')
              apiState.dispatch(clearCredentials())
              console.log('state from logout after' + JSON.stringify(apiState.getState()))
              return response
            })
        },
      }),
    })
  })