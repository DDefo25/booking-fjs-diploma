import { createApi } from "@reduxjs/toolkit/query/react"
import { SERVER_URL } from "../config/config"
import { User } from "../interfaces/User.interface"
import { axiosBaseQuery } from "../store/axiosBaseQuery"

export interface HotelRoomRequest {
  hotel?: string,
  limit: number,
  offset: number,
  title?: string
}


export interface HotelRequest {
  limit: number,
  offset: number
  title?: string
}

export interface HotelAddRequest {
  title: string,
  description: string,
  images: string[]
}

export interface HotelEditRequest {
  id: string,
  title?: string,
  description?: string,
  images?: string[]
}

export interface Hotel {
  _id?: string,
  title: string,
  description: string,
  images: string[]
}

export interface HotelRoom {
  _id: string,
  description: string,
  images: string[],
  isEnabled: boolean,
  hotel: Hotel
}

export const hotelAPI = createApi({
    reducerPath: "hotelAPI",
    baseQuery: axiosBaseQuery({
      baseUrl: `${SERVER_URL}/api`
    }),
    tagTypes: ['Hotel', 'HotelRoom'],
    endpoints: (build) => ({

      getHotelRooms: build.query<HotelRoom[], HotelRoomRequest>({
        query: (params) => ({
          url: '/common/hotel-rooms',
          method: 'get',
          params
        }),
        providesTags: ['HotelRoom']
      }),

      getHotelRoom: build.query<HotelRoom, string>({
        query: (id) => ({
          url: `/common/hotel-rooms/${id}`,
          method: 'get',
        }),
        providesTags: ['HotelRoom']
      }),

      addHotel: build.mutation<Hotel, HotelAddRequest>({
        query: (data) => ({
          url: '/admin/hotels',
          method: 'post',
          data
        }),
        invalidatesTags: ['Hotel']
      }),

      getHotels: build.query<Hotel[], HotelRequest>({
        query: (params) => ({
          url: '/admin/hotels',
          method: 'get',
          params
        }),
        providesTags: ['Hotel']
      }),


      editHotel: build.mutation<Hotel, HotelEditRequest>({
        query: ({id, ...data}) => ({
            url: `/admin/hotels/${id}`,
            method: 'put',
            data
        }),
        invalidatesTags: ['Hotel']
      }),
    }),
})

export const { 
  useAddHotelMutation, 
  useEditHotelMutation,
  useGetHotelRoomQuery,
  useGetHotelsQuery,
  useGetHotelRoomsQuery,
} = hotelAPI