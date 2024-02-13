import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../interfaces/User.interface";
import { RootState } from "../store/store";
import { UserResponse } from "../services/auth.service";

const initialState: AuthState = {
    user: null,
    token: null,
    isAuth: false,
    isAuthInProgress: false 
}

export const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authInProgress: (state) => {
            return {
                ...state,
                isAuthInProgress: true
            }
        },
        setCredentials: (
            _,
            { payload: { user, token } }: PayloadAction<UserResponse>,
        ) => {
            // const isAuth = !!user
            return {
                user,
                token,
                isAuth: !!user,
                isAuthInProgress: false
            }
        },
        clearCredentials: () => {
            console.log('logout from state')
            return {...initialState} }
    },
})

export const { authInProgress, setCredentials, clearCredentials } = userSlice.actions
export const authSelector = (state: RootState) => state.auth
// export const authStateSelector = ({ auth: { isAuth, isAuthInProgress } }: RootState) => { return { isAuth, isAuthInProgress }}
export default userSlice.reducer;