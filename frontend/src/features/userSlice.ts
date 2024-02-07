import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser, IUserState } from "../interfaces/User.interface";
import { RootState } from "../store";

const initialState: IUserState = {
    isLoggedIn: false,
    user: {
        _id: '',
        name: '',
        email: ''
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<IUserState>) => {
            return {
                ...action.payload,
                isLoggedIn: true
            }
        },

        logoutUser: () => {
            return {...initialState}
        }
    }
})

export const { loginUser, logoutUser } = userSlice.actions
export const userSelector = (state: RootState) => state.user
export default userSlice.reducer;