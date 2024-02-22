import { createApi } from "@reduxjs/toolkit/query/react"
import { SERVER_URL } from "../config/config"
import { User } from "../interfaces/User.interface"
import { axiosBaseQuery } from "../store/axiosBaseQuery"
import { Hotel } from "../components/HotelsModule/interfaces/Hotel.interface.dto"
import { Role } from "../config/roles.enum"
import { Reservation } from "./interfaces/Reservation.interface"

export interface CreateReservationRequest {
    hotelRoom: string,
    startDate: string,
    endDate: string
}

export interface DeleteReservationRequest {
  id: string,
  role: Role
}

export const reservationAPI = createApi({
    reducerPath: "reservationAPI",
    baseQuery: axiosBaseQuery({
      baseUrl: `${SERVER_URL}/api`
    }),
    tagTypes: ['Reservation'],
    endpoints: (build) => ({
      getReservations: build.query<Reservation[], void>({
        query: () => ({
          url: `/${Role.Client}/reservations`,
          method: 'get'
        }),
        providesTags: ['Reservation']
      }),

      getReservationsById: build.query<Reservation[], string>({
        query: (userId) => ({
          url: `/${Role.Manager}/reservations/${userId}`,
          method: 'get'
        }),
        providesTags: ['Reservation']
      }),

      createReservation: build.mutation<Reservation, CreateReservationRequest>({
        query: (data) => ({
            url: `/${Role.Client}/reservations`,
            method: 'post',
            data
        }),
        invalidatesTags: ['Reservation']
      }),

      
      deleteReservation: build.mutation<void, DeleteReservationRequest>({
        query: ({id, role}) => ({
            url: `/${role}/reservations/${id}`,
            method: 'delete'
        }),
        invalidatesTags: ['Reservation']
      }),
    }),
})

export const { 
  useCreateReservationMutation,
  useDeleteReservationMutation,
  useGetReservationsByIdQuery,
  useGetReservationsQuery
} = reservationAPI