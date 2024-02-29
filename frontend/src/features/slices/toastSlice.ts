import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { v4 as uuid } from 'uuid';
import { ErrorResponse } from 'react-router-dom';
import { ToastTypes } from '../../config/toasts.enums';


interface BaseToast {
  id?: string,
  type: ToastTypes,
}

interface BaseData {
  title: string,
  message: string
}

export interface ErrorWs {
  name: string,
  message: string,
  requestData: any,
  timestamp: string
}

export interface ErrorToast extends BaseToast {
  type: ToastTypes.ErrorResponse,
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

export interface ErrorWsToast extends BaseToast {
  type: ToastTypes.ErrorWs,
  data: ErrorWs
}

export type Toast = ErrorToast | NotifyToast | MessageSupportToast | CommonToast | ErrorWsToast;

export interface ToastState {
  list: Toast[]
}

const initialState: ToastState = {
  list: [],
};


export const slice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast: (state: ToastState, { payload: toast }: PayloadAction<Toast>) => {
      toast.id = uuid();
      state.list = [...state.list, toast];
    },
    deleteToast: (state: ToastState, { payload: id }: PayloadAction<string>) => {
      state.list = state.list.filter( toast => toast.id !== id );
    },
    clearToastList: (state: ToastState): void => {
      state = { ...initialState };
    },
  },
});

export const { addToast, deleteToast, clearToastList } = slice.actions;
export const selectToastState = (state: RootState) => state.toast;
export const selectToastList = (state: RootState) => state.toast.list;
export default slice.reducer;