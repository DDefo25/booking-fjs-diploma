import { SerializedError } from "@reduxjs/toolkit"

export interface User {
    _id: string,
    name: string,
    email: string
}

export interface AuthState {
    user: User | null
    token: string | null
}