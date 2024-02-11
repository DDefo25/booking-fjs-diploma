import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../interfaces/User.interface";
import { RootState } from "../store";
import { UserResponse } from "../services/auth.service";

const initialState: AuthState = {
    user: null,
    token: null
}

export const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            _,
            { payload: { user, token } }: PayloadAction<UserResponse>,
        ) => {
            return {
                user,
                token
            }
        },
        clearCredentials: () => {
            console.log('logout from state')
            return initialState}
    },
})

export const { setCredentials, clearCredentials } = userSlice.actions
export const userSelector = (state: RootState) => state.auth.user
export default userSlice.reducer;