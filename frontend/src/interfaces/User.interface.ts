import { SerializedError } from "@reduxjs/toolkit"

export interface User {
    _id: string,
    name: string,
    email: string,
    role: string
}

export interface AuthState {
    user: User | null
    token: string | null
    isAuth: boolean,
    isAuthInProgress: boolean 
}