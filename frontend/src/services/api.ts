import { createApi } from "@reduxjs/toolkit/query/react"
import { SERVER_URL } from "../config/config"
import { User } from "../interfaces/User.interface"
import { axiosBaseQuery } from "../store/axiosBaseQuery"


export const api = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery({
      baseUrl: `${SERVER_URL}/api`
    }),
    tagTypes: ['User', 'Hotels', 'HotelRooms', 'Reservations'],
    endpoints: () => ({})
})

export const enhancedApi = api.enhanceEndpoints({
  endpoints: () => ({
    getPost: () => 'test',
  }),
})