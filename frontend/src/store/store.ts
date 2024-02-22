import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/slices/authSlice'
import toastReducer from '../features/slices/toastSlice'


import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { authAPI } from '../services/authAPI'
import { hotelAPI } from '../services/hotelAPI'
import { userAPI } from '../services/userAPI'
import { reservationAPI } from '../services/reservationAPI'
import { rtkQueryErrorMiddleware } from '../features/middleware/rtkQueryErrorMiddleware'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth, toast']
}

const rootReducer = combineReducers({
  auth: authReducer,
  toast: toastReducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [hotelAPI.reducerPath]: hotelAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [reservationAPI.reducerPath]: reservationAPI.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

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
        rtkQueryErrorMiddleware
      )
})




export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch
