import { useEffect } from "react";
import { onConnectSocket, onDisconnectSocket, onSubscribeToChatEvents } from "../features/slices/socket.io.Slice";
import { useAppDispatch } from "../store/store";
import { socket } from "./socket";
import { useCheckRoles } from "../hooks/useCheckRoles";
import { Role } from "../config/roles.enum";

export const SocketClient = () => {
    const dispatch = useAppDispatch()
    
    useEffect(() => {
      function onConnect() {
        dispatch( onConnectSocket());
      }
  
      function onDisconnect() {
        dispatch( onDisconnectSocket());
      }
  
      function onSubscribeToChatEvent(value: (...args: any[]) => void ) {
        dispatch( onSubscribeToChatEvents(value));
      }
  
      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
      socket.on('subscribeToChat', onSubscribeToChatEvent);
  
      return () => {
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
        socket.off('subscribeToChat', onSubscribeToChatEvent);
      };
    }, []);
}