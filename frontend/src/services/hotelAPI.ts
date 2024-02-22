import { createApi } from "@reduxjs/toolkit/query/react"
import { SERVER_URL } from "../config/config"
import { User } from "../interfaces/User.interface"
import { axiosBaseQuery } from "../store/axiosBaseQuery"
import { HotelRoom } from "../components/HotelsModule/interfaces/HotellRoom.interface.dto"
import { Hotel } from "../components/HotelsModule/interfaces/Hotel.interface.dto"


export interface HotelRoomRequest {
  hotel?: string,
  limit: number,
  offset: number,
  title?: string
}

export interface HotelRoomEditRequest {
  id: string,
  hotel: Hotel | string,
  description?: string,
  images: string[]
  imagesFiles: File[]
  imagesPreview: string[],
}


export interface HotelRequest {
  limit: number,
  offset: number
  title?: string
}

export interface HotelAddRequest {
  title: string,
  description: string,
  images: File[]
}



export interface HotelEditRequest {
  id: string,
  title: string,
  description?: string,
  images: string[]
}

// export interface Hotel {
//   _id?: string,
//   title: string,
//   description: string,
//   images: string[]
// }

// export interface HotelRoom {
//   _id: string,
//   description: string,
//   images: string[],
//   isEnabled: boolean,
//   hotel: Hotel
// }

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

      editHotelRoom: build.mutation<HotelRoom, any>({
        query: ({id, data}) => ({
            url: `/admin/hotel-rooms/${id}`,
            method: 'put',
            headers: {"Content-Type": "multipart/form-data"},
            data
        }),
        invalidatesTags: ['HotelRoom']
      }),

      addHotel: build.mutation<Hotel, HotelAddRequest>({
        query: (data) => ({
            url: '/admin/hotels',
            method: 'post',
            headers: {"Content-Type": "multipart/form-data"},
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

      getHotel: build.query<Hotel, string>({
        query: (id) => ({
          url: `/common/hotels/${id}`,
          method: 'get',
        }),
        providesTags: ['Hotel']
      }),

      editHotel: build.mutation<Hotel, HotelEditRequest>({
        query: ({id, ...data}) => ({
            url: `/admin/hotels/${id}`,
            method: 'put',
            headers: {"Content-Type": "multipart/form-data"},
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
  useLazyGetHotelsQuery,
  useGetHotelQuery,
  useEditHotelRoomMutation
} = hotelAPI