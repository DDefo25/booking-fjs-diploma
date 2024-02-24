import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../store/store"
import { socket } from "../../socket/socket";

export interface SocketIOState {
    isConnected: boolean,
    subscribeToChatEvents: Function[]
}

const initialState: SocketIOState = {
    isConnected: socket.connected,
    subscribeToChatEvents: []
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
        }
    },
})

export const { 
    onConnectSocket, 
    onDisconnectSocket, 
    onSubscribeToChatEvents 
} = slice.actions
export const selectSocketState = (state: RootState) => state.socketIO
export const selectSocketSubscribeToChatEvents = (state: RootState) => state.socketIO.subscribeToChatEvents
export default slice.reducer;