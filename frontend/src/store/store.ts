import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/slices/authSlice';
import toastReducer from '../features/slices/toastSlice';
import reservationDateReducer from '../features/slices/reservationDateSlice';
import socketIOReducer from '../features/slices/socket.io.Slice';

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authAPI } from '../services/authAPI';
import { hotelAPI } from '../services/hotelAPI';
import { userAPI } from '../services/userAPI';
import { reservationAPI } from '../services/reservationAPI';
import { rtkQueryErrorMiddleware } from '../features/middleware/rtkQueryErrorMiddleware';
import { supportRequestAPI } from '../services/supportRequestAPI';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  toast: toastReducer,
  reservationDate: reservationDateReducer,
  socketIO: socketIOReducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [hotelAPI.reducerPath]: hotelAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [reservationAPI.reducerPath]: reservationAPI.reducer,
  [supportRequestAPI.reducerPath]: supportRequestAPI.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authAPI.middleware, 
      hotelAPI.middleware,
      userAPI.middleware,
      reservationAPI.middleware,
      supportRequestAPI.middleware,
      rtkQueryErrorMiddleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
