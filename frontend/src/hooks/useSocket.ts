import { useEffect } from "react";
import { useCheckRoles } from "./useCheckRoles";
import { socket } from "../socket/SocketClient";
import { Role } from "../config/roles.enum";

export const useSocket = ( token: string ) => {
    const isAllow = useCheckRoles()

    useEffect(() => {
        
        if (isAllow([ Role.Client, Role.Manager ])) {
            socket.io.opts.extraHeaders = {
                Authorization: token
            }
            socket.connect()
        }
      
        return () => { 
            socket.disconnect() 
        }
    }, [token]);
}