import { createApi } from "@reduxjs/toolkit/query/react"
import { SERVER_URL } from "../config/config"
import { User } from "../interfaces/User.interface"
import { axiosBaseQuery } from "../store/axiosBaseQuery"
import { Hotel } from "../components/HotelsModule/interfaces/Hotel.interface.dto"
import { Role } from "../config/roles.enum"
import { Reservation } from "./interfaces/Reservation.interface"

export interface Message {
  author: User,
  text: string,
  readAt?: Date,
  sentAt: Date
}

export interface SupportRequest {
  id: string,
  user: string,
  messages: Message[],
  isActive?: boolean,
  createdAt: Date
}

export interface SearchSupportRequest {
  limit: number,
  offset: number,
  isActive: boolean,
  role: Role
}

export interface ReadSupportRequestMessagesResponse { 
  success: boolean, 
  error?: unknown
}

export const supportRequestAPI = createApi({
    reducerPath: "supportRequestAPI",
    baseQuery: axiosBaseQuery({
      baseUrl: `${SERVER_URL}/api`
    }),
    tagTypes: ['SupportRequest', 'SupportRequestMessage'],
    endpoints: (build) => ({
      getSupportRequests: build.query<SupportRequest[], SearchSupportRequest>({
        query: ({role, ...params}) => ({
          url: `/${role}/support-requests`,
          method: 'get',
          params
        }),
        providesTags: ['SupportRequest']
      }),

      createSupportRequest: build.mutation<SupportRequest, { text: string }>({
        query: (data) => ({
            url: `/${Role.Client}/support-requests`,
            method: 'post',
            data
        }),
        invalidatesTags: ['SupportRequest']
      }),

      getSupportRequestMessages: build.query<Message[], string>({
        query: (id) => ({
          url: `/common/support-requests/${id}/messages`,
          method: 'get',
        }),
        providesTags: ['SupportRequestMessage']
      }),

      sendSupportRequestMessage: build.mutation<Message, { id: string, text: string }>({
        query: ({id, ...data}) => ({
            url: `/common/support-requests/${id}/messages`,
            method: 'post',
            data
        }),
        invalidatesTags: ['SupportRequestMessage']
      }),

      readSupportRequestMessages: build.mutation<ReadSupportRequestMessagesResponse, { id: string, createdBefore: string }>({
        query: ({id, ...data}) => ({
            url: `/common/support-requests/${id}/messages/read`,
            method: 'post',
            data
        }),
        invalidatesTags: ['SupportRequestMessage']
      }),
    }),
})

export const { 
  useCreateSupportRequestMutation,
  useGetSupportRequestMessagesQuery,
  useGetSupportRequestsQuery,
  useReadSupportRequestMessagesMutation,
  useSendSupportRequestMessageMutation
} = supportRequestAPI