import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'


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

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
  auth: authReducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [hotelAPI.reducerPath]: hotelAPI.reducer,
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
        hotelAPI.middleware
      )
})




export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch
