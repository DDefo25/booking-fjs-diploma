import { useEffect } from 'react';
import { socket } from '../socket/SocketClient';

export const useOnSocketMessage = (event: string, listener: (...args: any[]) => void) => {
  useEffect(() => {
    socket.on(event, listener);
    return () => {
      socket.off(event, listener);
    };
  });
};