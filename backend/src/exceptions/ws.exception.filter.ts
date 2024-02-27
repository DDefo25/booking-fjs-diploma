import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch(WsException)
export class WsExceptionFilter implements ExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const client: Socket = ctx.getClient();
    const requestData = ctx.getData();

    client.emit('error', {
      name: exception.name,
      message: exception.message,
      requestData,
      timestamp: new Date().toISOString(),
    });
  }
}
