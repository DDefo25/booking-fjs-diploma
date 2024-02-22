import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../../interfaces/User.interface"
import { RootState } from "../../store/store"
import { authAPI, UserResponse } from "../../services/authAPI"
// import { RejectResponse } from "../../store/axiosBaseQuery"
import { v4 as uuid } from 'uuid'
import { ErrorResponse, To } from "react-router-dom"
import { ToastClasses, ToastTypes } from "../../config/toasts.enums"


interface BaseToast {
    id: string,
    type: ToastTypes,
}

interface BaseData {
    title: string,
    message: string
}

export interface ErrorToast extends BaseToast {
    type: ToastTypes.Error,
    data: ErrorResponse,
}

export interface NotifyToast extends BaseToast {
    type: ToastTypes.Notify,
    data: BaseData, 
}

export interface MessageSupportToast extends BaseToast {
    type: ToastTypes.MessageSupport,
    data: BaseData, 
}

export interface CommonToast extends BaseToast {
    type: ToastTypes.Common,
    data: BaseData, 
}

export type Toast = ErrorToast | NotifyToast | MessageSupportToast | CommonToast

export interface ToastState {
    list: Toast[]
}

const initialState: ToastState = {
    list: []
}


export const slice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        addToast: (state: ToastState, { payload: toast }: PayloadAction<Toast>) => {
            toast.id = uuid()
            state.list = [...state.list, toast]
        },
        deleteToast: (state: ToastState, { payload: id }: PayloadAction<string>) => {
            state.list = state.list.filter( toast => toast.id !== id )
        },
        clearToastList: (state: ToastState): void => {
            state = {...initialState}
        }
    },
})

export const { addToast, deleteToast, clearToastList } = slice.actions
export const selectToastState = (state: RootState) => state.toast
export const selectToastList = (state: RootState) => state.toast.list
export default slice.reducer;