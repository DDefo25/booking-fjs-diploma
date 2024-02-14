import { User } from "../interfaces/User.interface";
import { api } from "./api";

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

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({

    login: build.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'post',
        data: credentials
      }),
    }),

    register: build.mutation<UserResponse, RegisterRequest>({
      query: (credentials) => ({
          url: '/client/register',
          method: 'post',
          data: credentials
      })
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = authApi

export const {
  endpoints: { login, register },
} = authApi