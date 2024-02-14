import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../../interfaces/User.interface"
import { RootState } from "../../store/store"
import { authApi, UserResponse } from "../../services/auth.service"


export interface AuthState {
    user: User | null
    token: string | null
    isAuth: boolean,
}

const initialState: AuthState = {
    user: null,
    token: null,
    isAuth: false,
}

export const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => {
            localStorage.removeItem('token')
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(authApi.endpoints.login.matchPending, (state, action) => {
                console.log('pending', action)
            })
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state, {payload}: PayloadAction<UserResponse>) => {
                console.log('fulfilled', payload)
                const { user, token } = payload
                localStorage.setItem('token', token)
                state.user = user
                state.token = token
                state.isAuth = !!user 
            })
            .addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
                console.log('rejected', action)
            })
            .addMatcher(authApi.endpoints.register.matchPending, (state, action) => {
                console.log('pending', action)
            })
            .addMatcher(authApi.endpoints.register.matchFulfilled, (state, action) => {
                console.log('fulfilled', action)
                const { payload: { user, token } }: PayloadAction<UserResponse> = action
                state.user = user
                state.token = token
                state.isAuth = !!user
            })
            .addMatcher(authApi.endpoints.register.matchRejected, (state, action) => {
                console.log('rejected', action)
            })
    }
})

export const { logout } = slice.actions
export const selectAuth = (state: RootState) => state.auth
export const selectIsAuth = (state: RootState) => state.auth.isAuth
export const selectUser = (state: RootState) => state.auth.user
export default slice.reducer;