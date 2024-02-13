import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { SERVER_URL } from "../config/config";
import { IRegisterDto } from "./interfaces/register.params";
import { ILoginDto } from "./interfaces/login.params";
import instance from "../config/axiosConfig";
import { catchError } from '../exceptions/catchError'
import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from "../store/store";
import { User } from "../interfaces/User.interface";
import { authInProgress, clearCredentials, setCredentials } from "../features/userSlice";

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

export class AuthService {

    static register = async (reqData: IRegisterDto) => {
      try {
        const { data } = await instance.post('/api/client/register', reqData)
        return data
      } catch (e) {
        return catchError(e)
      };
    }
      
      
    static login = async (reqData: ILoginDto) => {
      try {
        const { data } = await instance.post('/api/auth/login', reqData)
        return data
      } catch (e) {
        return catchError(e)
      };
    };
      

    static logout = async () => {
      try {
        const { data } = await instance.post("/api/auth/logout")
        return data
      } catch (e) {
        return catchError(e)
      };
    }


    static getUser: () => any = async () => {
      const token = localStorage.getItem('token' )
      if (!token || token?.length < 0) {
        return { user: null, token: null }
      }

      try {
        const { data: user } = await instance.get("/api/auth/get-user")
        return { user, token }
      } catch (e) {
        return catchError(e)
      };
    }
  
    static api = createApi({
      baseQuery: fetchBaseQuery({
        baseUrl: SERVER_URL
      }),
      endpoints: builder => ({
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
}


export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = AuthService.api
