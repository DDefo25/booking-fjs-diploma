import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../store/axiosBaseQuery';
import { Role } from '../config/roles.enum';
import { Reservation } from './interfaces/Reservation.interface';

export interface CreateReservationRequest {
  hotelRoom: string,
  dateStart: string,
  dateEnd: string
}

export interface DeleteReservationRequest {
  id: string,
  role: Role
}

export const reservationAPI = createApi({
  reducerPath: 'reservationAPI',
  baseQuery: axiosBaseQuery({
    baseUrl: 'api',
  }),
  tagTypes: ['Reservation', 'HotelRoom'],
  endpoints: (build) => ({
    getReservations: build.query<Reservation[], void>({
      query: () => ({
        url: `/${Role.Client}/reservations`,
        method: 'get',
      }),
      providesTags: ['Reservation'],
    }),

    getReservationsById: build.query<Reservation[], string>({
      query: (userId) => ({
        url: `/${Role.Manager}/reservations/${userId}`,
        method: 'get',
      }),
      providesTags: ['Reservation'],
    }),

    createReservation: build.mutation<Reservation, CreateReservationRequest>({
      query: (data) => ({
        url: `/${Role.Client}/reservations`,
        method: 'post',
        data,
      }),
      invalidatesTags: ['Reservation', 'HotelRoom'],
    }),

      
    deleteReservation: build.mutation<void, DeleteReservationRequest>({
      query: ({ id, role }) => ({
        url: `/${role}/reservations/${id}`,
        method: 'delete',
      }),
      invalidatesTags: ['Reservation', 'HotelRoom'],
    }),
  }),
});

export const { 
  useCreateReservationMutation,
  useDeleteReservationMutation,
  useGetReservationsByIdQuery,
  useGetReservationsQuery,
} = reservationAPI;