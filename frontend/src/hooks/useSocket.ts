import { useEffect } from 'react';
import { useCheckRoles } from './useCheckRoles';
import { socket } from '../socket/SocketClient';
import { Role } from '../config/roles.enum';

export const useSocket = ( ) => {
  const isAllow = useCheckRoles();

  useEffect(() => {
    const token = localStorage.getItem('token') || '' as string;
    if ( isAllow([ Role.Client, Role.Manager ])) {
      socket.io.opts.extraHeaders = {
        Authorization: token,
      };
      socket.connect();
    }

    const listener = (event: StorageEvent) => {
      
      if ( event.key === 'token'
                && isAllow([ Role.Client, Role.Manager ])
      ) {
        socket.io.opts.extraHeaders = {
          Authorization: event.newValue!,
        };
      }
    };

    window.addEventListener('storage', listener);
      
    return () => { 
      socket.disconnect(); 
      window.removeEventListener('storage', listener);
    };
  }, []);
};