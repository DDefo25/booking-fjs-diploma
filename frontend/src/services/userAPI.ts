import { createApi } from '@reduxjs/toolkit/query/react';
import { User } from '../interfaces/User.interface';
import { axiosBaseQuery } from '../store/axiosBaseQuery';
import { Role } from '../config/roles.enum';

export interface CreateUserRequest {
  email: string,
  password: string,
  name: string,
  contactPhone: string,
  role: Role,
  requestRole: Role | null
}

export interface GetUsersRequest {
  limit: number,
  offset: number,
  filter: string,
  requestRole: Role | null
}

export interface GetUsersResponse {
  users: User[],
  count: number
}

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: axiosBaseQuery({
    baseUrl: 'api',
  }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    getUsers: build.query<GetUsersResponse, GetUsersRequest>({
      query: ({ requestRole, ...params }) => ({
        url: `/${requestRole}/users`,
        method: 'get',
        params,
      }),
      providesTags: ['User'],
    }),

    createUser: build.mutation<User, CreateUserRequest>({
      query: ({ requestRole, ...data }) => ({
        url: `/${requestRole}/users`,
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { 
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useCreateUserMutation,
} = userAPI;