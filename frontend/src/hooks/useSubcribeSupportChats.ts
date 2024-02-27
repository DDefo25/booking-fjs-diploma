import { useEffect } from 'react';
import { useCheckRoles } from './useCheckRoles';
import { socket } from '../socket/SocketClient';
import { Role } from '../config/roles.enum';
import { useTypedSelector } from '../store/store';
import { selectUser } from '../features/slices/authSlice';
import { User } from '../interfaces/User.interface';
import { useGetSupportRequestsQuery } from '../services/supportRequestAPI';
import { selectSocketState } from '../features/slices/socket.io.Slice';

export const useSubcribeSupportChats = () => {
  const isAllow = useCheckRoles();
  const { role } = useTypedSelector( selectUser ) || {} as User;
  const { isConnected } = useTypedSelector(selectSocketState);
  const { data } = useGetSupportRequestsQuery({ isActive: true, role });

  useEffect(() => {
    if ( isConnected
            && isAllow([ Role.Client, Role.Manager ] )
    ) {
      data && data.supportRequests.forEach( el => {socket.emit('subscribeToChat', { chatId: el.id })});
    }
        
    const joinRooms = (event: StorageEvent) => {
      if ( event.key === 'token' 
                && isAllow([ Role.Client, Role.Manager ] )
      ) {
        data && data.supportRequests.forEach( el => {socket.emit('subscribeToChat', { chatId: el.id })});
      }
            
    };
        
    window.addEventListener('storage', joinRooms);

    return () => {
      window.removeEventListener('storage', joinRooms);
    };
  }, [isConnected]);
};