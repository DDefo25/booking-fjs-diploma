import { useEffect } from "react";
import { useCheckRoles } from "./useCheckRoles";
import { socket } from "../socket/SocketClient";
import { Role } from "../config/roles.enum";
import { useTypedSelector } from "../store/store";
import { selectUser } from "../features/slices/authSlice";
import { User } from "../interfaces/User.interface";
import { useGetSupportRequestsQuery } from "../services/supportRequestAPI";

export const useSubcribeSupportChats = ( token: string ) => {
    const isAllow = useCheckRoles()
    const { role } = useTypedSelector( selectUser ) || {} as User
    const { data } = useGetSupportRequestsQuery({ isActive: true, role })

    useEffect(() => {
        if ( socket.connected 
            && data 
            && isAllow([ Role.Client, Role.Manager ]) 
        ) {
             data.supportRequests.forEach( el => socket.emit('subscribeToChat', {chatId: el.id}))
        }
    }, [socket.connected, token]);
}