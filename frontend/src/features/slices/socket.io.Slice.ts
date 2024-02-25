import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../store/store"
import { socket } from "../../socket/SocketClient"


export interface SocketIOState {
    isConnected: boolean,
    subscribeToChatEvents: Function[],
    errorEvents: Function[],
}

const initialState: SocketIOState = {
    isConnected: socket.connected,
    subscribeToChatEvents: [],
    errorEvents: []
}

export const slice = createSlice({
    name: 'socketIO',
    initialState,
    reducers: {
        onConnectSocket: (state: SocketIOState) => {
            console.log('socket connected')
            state.isConnected = true 
        },
        onDisconnectSocket: (state: SocketIOState) => {
            console.log('socket disconnected')
            state.isConnected = false 
        },
        onSubscribeToChatEvents: (state: SocketIOState, { payload }: PayloadAction<Function>): void => {
            console.log('subscribeToChatEvent', payload)
            state.subscribeToChatEvents = [...state.subscribeToChatEvents, payload]
        },
        onErrorEvents: (state: SocketIOState, { payload }: PayloadAction<Function>): void => {
            console.log('error', payload)
            state.errorEvents = [...state.errorEvents, payload]
        }
    },
})

export const { 
    onConnectSocket, 
    onDisconnectSocket, 
    onSubscribeToChatEvents,
    onErrorEvents
} = slice.actions
export const selectSocketState = (state: RootState) => state.socketIO
export const selectSocketSubscribeToChatEvents = (state: RootState) => state.socketIO.subscribeToChatEvents
export const selectErrorEvents = (state: RootState) => state.socketIO.errorEvents
export default slice.reducer;