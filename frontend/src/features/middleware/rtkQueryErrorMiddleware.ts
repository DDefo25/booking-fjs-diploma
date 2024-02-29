import { Middleware, MiddlewareAPI, PayloadAction, isRejectedWithValue } from '@reduxjs/toolkit';
import { addToast } from '../slices/toastSlice';
import { v4 as uuid } from 'uuid';
import { ErrorResponse } from 'react-router-dom';
import { logout } from '../slices/authSlice';
import { ToastTypes } from '../../config/toasts.enums';

export const rtkQueryErrorMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action: any) => {

    if (isRejectedWithValue(action)) {
      console.warn('We got a rejected action!', action);
      const { payload: error } = action as PayloadAction<ErrorResponse>;

      if (error.status === 401) {
        console.log('error 401', error)
        api.dispatch( logout());
      }

      api.dispatch( addToast({
        id: uuid(),
        type: ToastTypes.ErrorResponse,
        data: error, 
      }));
    }

    return next(action);
  };