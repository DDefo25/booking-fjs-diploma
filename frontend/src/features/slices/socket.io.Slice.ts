import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { socket } from '../../socket/SocketClient';
import { Message } from '../../services/supportRequestAPI';

export interface OnSubscribeToChatMessage {
  supportReqID: string,
  message: Message
}

export interface SocketIOState {
  isConnected: boolean,
  subscribeToChatEvents: OnSubscribeToChatMessage[],
  errorEvents: Function[],
}

const initialState: SocketIOState = {
  isConnected: socket.connected,
  subscribeToChatEvents: [],
  errorEvents: [],
};


export const slice = createSlice({
  name: 'socketIO',
  initialState,
  reducers: {
    onConnectSocket: (state: SocketIOState) => {
      
      state.isConnected = true; 
    },
    onDisconnectSocket: (state: SocketIOState) => {
      
      state.isConnected = false; 
    },
    onSubscribeToChatEvents: (state: SocketIOState, { payload }: PayloadAction<OnSubscribeToChatMessage>): void => {
      
      state.subscribeToChatEvents = [...state.subscribeToChatEvents, payload];
    },
    onErrorEvents: (state: SocketIOState, { payload }: PayloadAction<Function>): void => {
      
      state.errorEvents = [...state.errorEvents, payload];
    },
  },
});

export const { 
  onConnectSocket, 
  onDisconnectSocket, 
  onSubscribeToChatEvents,
  onErrorEvents,
} = slice.actions;
export const selectSocketState = (state: RootState) => state.socketIO;
export const selectSocketSubscribeToChatEvents = (state: RootState) => state.socketIO.subscribeToChatEvents;
export const selectErrorEvents = (state: RootState) => state.socketIO.errorEvents;
export default slice.reducer;