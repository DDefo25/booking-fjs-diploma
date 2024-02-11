import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/userSlice'
import { AuthService } from './services/auth.service'

export const store = configureStore({
    reducer: {
      [AuthService.api.reducerPath]: AuthService.api.reducer,
      auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthService.api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

