import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../store/axiosBaseQuery';
import { HotelRoom } from '../components/HotelsModule/interfaces/HotellRoom.interface.dto';
import { Hotel } from '../components/HotelsModule/interfaces/Hotel.interface.dto';
import { Role } from '../config/roles.enum';


export interface HotelRoomRequest {
  hotel?: string,
  limit: number,
  offset: number,
  title?: string
  dateStart?: string,
  dateEnd?: string
}

export interface GetHotelRoomsDto {
  _id: string,
  hotel: Hotel,
  hotelRooms: HotelRoom[],
  countRooms: number
}

export interface GetHotelsResponse {
  hotels: Hotel[],
  count: number
}

export interface HotelRoomEditRequest {
  id: string,
  title: string,
  hotel: Hotel | string,
  description?: string,
  images: string[]
  imagesFiles: File[]
  imagesPreview: string[],
}

export interface HotelRoomAddRequest {
  hotel: string,
  title: string,
  description?: string,
  images: File[]
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

export const hotelAPI = createApi({
  reducerPath: 'hotelAPI',
  baseQuery: axiosBaseQuery({
    baseUrl: 'api',
  }),
  tagTypes: ['Hotel', 'HotelRoom'],
  endpoints: (build) => ({

    getHotelRooms: build.query<GetHotelRoomsDto[], HotelRoomRequest>({
      query: (params) => ({
        url: '/common/hotel-rooms',
        method: 'get',
        params,
      }),
      providesTags: ['HotelRoom'],
    }),

    getHotelRoom: build.query<HotelRoom, string>({
      query: (id) => ({
        url: `/common/hotel-rooms/${id}`,
        method: 'get',
      }),
      providesTags: ['HotelRoom'],
    }),

    createHotelRoom: build.mutation<HotelRoom, HotelRoomAddRequest>({
      query: (data) => ({
        url: `/${Role.Admin}/hotel-rooms`,
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data,
      }),
      invalidatesTags: ['HotelRoom'],
    }),

    editHotelRoom: build.mutation<HotelRoom, any>({
      query: ({ id, data }) => ({
        url: `/${Role.Admin}/hotel-rooms/${id}`,
        method: 'put',
        headers: { 'Content-Type': 'multipart/form-data' },
        data,
      }),
      invalidatesTags: ['HotelRoom'],
    }),

    addHotel: build.mutation<Hotel, HotelAddRequest>({
      query: (data) => ({
        url: `/${Role.Admin}/hotels`,
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data,
      }),
      invalidatesTags: ['Hotel'],
    }),

    getHotels: build.query<GetHotelsResponse, HotelRequest>({
      query: (params) => ({
        url: `/${Role.Admin}/hotels`,
        method: 'get',
        params,
      }),
      providesTags: ['Hotel'],
    }),

    getHotel: build.query<Hotel, string>({
      query: (id) => ({
        url: `/common/hotels/${id}`,
        method: 'get',
      }),
      providesTags: ['Hotel'],
    }),

    editHotel: build.mutation<Hotel, HotelEditRequest>({
      query: ({ id, ...data }) => ({
        url: `/${Role.Admin}/hotels/${id}`,
        method: 'put',
        headers: { 'Content-Type': 'multipart/form-data' },
        data,
      }),
      invalidatesTags: ['Hotel'],
    }),
  }),
});

export const { 
  useAddHotelMutation, 
  useEditHotelMutation,
  useGetHotelRoomQuery,
  useGetHotelsQuery,
  useGetHotelRoomsQuery,
  useLazyGetHotelsQuery,
  useGetHotelQuery,
  useEditHotelRoomMutation,
  useCreateHotelRoomMutation,
} = hotelAPI;