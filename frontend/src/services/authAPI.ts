import { createApi } from '@reduxjs/toolkit/query/react';
import { User } from '../interfaces/User.interface';
import { axiosBaseQuery } from '../store/axiosBaseQuery';

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

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: axiosBaseQuery({
    baseUrl: 'api',
  }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    
    getUser: build.query<User, void>({
      query: () => ({
        url: '/auth/get-user',
        method: 'get',
      }),
      transformResponse: (response: any) => {
        
        return response;
      },
      providesTags: ['User'],
    }),

    login: build.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'post',
        data: credentials,
      }),
      invalidatesTags: ['User'],
    }),

    register: build.mutation<UserResponse, RegisterRequest>({
      query: (credentials) => ({
        url: '/client/register',
        method: 'post',
        data: credentials,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { 
  useLoginMutation, 
  useRegisterMutation, 
  useGetUserQuery, 
} = authAPI;
