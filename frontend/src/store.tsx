import { configureStore } from '@reduxjs/toolkit'
import inputReducer from './features/inputFieldSlice'

export const store = configureStore({
    reducer: {
      input: inputReducer,
    //   hotels: hotelsReducer,
    //   users: usersReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

