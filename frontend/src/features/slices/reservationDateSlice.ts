import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../../interfaces/User.interface"
import { RootState } from "../../store/store"
import { authAPI, UserResponse } from "../../services/authAPI"
// import { RejectResponse } from "../../store/axiosBaseQuery"
import { v4 as uuid } from 'uuid'
import { ErrorResponse, To } from "react-router-dom"
import { ToastClasses, ToastTypes } from "../../config/toasts.enums"
import { add, format } from "date-fns"
import { FormEvent } from "react"

export interface ReservationDateState {
    dateStart: string,
    dateEnd: string
}

const initialState: ReservationDateState = {
    dateStart: '',
    dateEnd: ''
}


export const slice = createSlice({
    name: 'reservationDate',
    initialState,
    reducers: {
        editReservationDate: (state: ReservationDateState, { payload: { target: { name, value }} }: PayloadAction<React.ChangeEvent<HTMLInputElement>>) => {
            state[ name as keyof ReservationDateState ] = value 
        },
        clearReservationDate: (state: ReservationDateState): void => {
            state = {...initialState}
        }
    },
})

export const { editReservationDate, clearReservationDate } = slice.actions
export const selectReservationDates = (state: RootState) => state.reservationDate
export default slice.reducer;