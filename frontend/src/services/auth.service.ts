// import { AxiosResponse } from "axios";
// import { User } from "../interfaces/User.interface";
// import { api } from "./authAPI";

// export interface LoginResponse {
//   user: User
//   token: string
// }

// export interface UserResponse {
//   user: User
//   token: string
// }

// export interface LogoutResponse {
//   success: boolean
// }


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

// export const authApi = api.injectEndpoints({
//   endpoints: (build) => ({
//     getUser: build.query<LoginResponse, void>({
//       query: () => ({
//         url: '/auth/get-user',
//         method: 'get'
//       }),
//       transformResponse: (response: any) => {
//         console.log(response)
//         return response
//       },
//       // invalidatesTags: [{ type: 'User', id: 'USER' }]
//     }),
//     login: build.mutation<LoginResponse, LoginRequest>({
//       query: (credentials) => ({
//         url: '/auth/login',
//         method: 'post',
//         data: credentials
//       }),
//       // providesTags: (result) => [{ type: 'User', id: 'USER' }]
//     }),


//     register: build.mutation<UserResponse, RegisterRequest>({
//       query: (credentials) => ({
//           url: '/client/register',
//           method: 'post',
//           data: credentials
//       })
//     }),
//   }),
// })

// export const { useLoginMutation, useRegisterMutation, useGetUserQuery } = authApi

// export const {
//   endpoints: { login, register, getUser },
// } = authApi