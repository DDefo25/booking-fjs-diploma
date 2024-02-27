import { createApi } from '@reduxjs/toolkit/query/react';
import { User } from '../interfaces/User.interface';
import { axiosBaseQuery } from '../store/axiosBaseQuery';
import { Role } from '../config/roles.enum';

export interface Message {
  author: User,
  text: string,
  readAt?: Date,
  sentAt: Date
}

export interface SupportRequest {
  id: string,
  isActive: boolean,
  hasNewMessages: boolean
  createdAt: Date
}

export interface SupportRequestResponse {
  supportRequests: SupportRequest[],
  count: number
}

export interface CreateSupportRequest {
  text: string
}

export interface SearchSupportRequest {
  limit?: number,
  offset?: number,
  isActive: boolean,
  role: Role
}

interface ReadSupportRequestMessagesRequest { 
  id: string, 
  createdBefore: string 
}


export interface ReadSupportRequestMessagesResponse { 
  success: boolean, 
  error?: unknown
}


export const supportRequestAPI = createApi({
  reducerPath: 'supportRequestAPI',
  baseQuery: axiosBaseQuery({
    baseUrl: 'api',
  }),
  tagTypes: ['SupportRequest', 'SupportRequestMessage'],
  endpoints: (build) => ({
    getSupportRequests: build.query<SupportRequestResponse, SearchSupportRequest>({
      query: ({ role, ...params }) => ({
        url: `/${role}/support-requests`,
        method: 'get',
        params,
      }),
      providesTags: ['SupportRequest'],
    }),

    createSupportRequest: build.mutation<SupportRequest, CreateSupportRequest>({
      query: (data) => ({
        url: `/${Role.Client}/support-requests`,
        method: 'post',
        data,
      }),
      invalidatesTags: ['SupportRequest'],
    }),

    getSupportRequestMessages: build.query<Message[], string>({
      query: (id) => ({
        url: `/common/support-requests/${id}/messages`,
        method: 'get',
      }),
      providesTags: ['SupportRequestMessage'],
    }),

    sendSupportRequestMessage: build.mutation<Message, { id: string, text: string }>({
      query: ({ id, ...data }) => ({
        url: `/common/support-requests/${id}/messages`,
        method: 'post',
        data,
      }),
      invalidatesTags: ['SupportRequestMessage'],
    }),

    readSupportRequestMessages: build.mutation<ReadSupportRequestMessagesResponse, ReadSupportRequestMessagesRequest>({
      query: ({ id, ...data }) => ({
        url: `/common/support-requests/${id}/messages/read`,
        method: 'post',
        data,
      }),
      invalidatesTags: ['SupportRequestMessage', 'SupportRequest'],
    }),

    closeSupportRequest: build.mutation<SupportRequest, string>({
      query: (id) => ({
        url: `/${Role.Manager}/support-requests/${id}/close`,
        method: 'post',
      }),
      invalidatesTags: ['SupportRequest'],
    }),
  }),
});

export const { 
  useCreateSupportRequestMutation,
  useGetSupportRequestMessagesQuery,
  useLazyGetSupportRequestMessagesQuery,
  useGetSupportRequestsQuery,
  useReadSupportRequestMessagesMutation,
  useSendSupportRequestMessageMutation,
  useCloseSupportRequestMutation,
} = supportRequestAPI;