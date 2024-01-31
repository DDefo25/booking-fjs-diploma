import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from '@nestjs/websockets';
import { SupportRequestService } from './support-request/support-request.service';
import { Server } from 'socket.io';
import { UseFilters, UseGuards } from '@nestjs/common';
import { WsRolesGuard } from 'src/auth/guards/ws.roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { WsExceptionFilter } from 'src/exceptions/ws.exception.filter';
import { WsJwtAuthGuard } from 'src/auth/guards/ws.jwt-auth.guard';
import { WsValidationPipe } from 'src/validation/ws.validation.pipe';
import { SubscribeToSupportRequestDto } from './interfaces/subscribe-support-request.dto';

@UseFilters(new WsExceptionFilter)
@WebSocketGateway( {
  cookie: true,
  cors: true
})
export class SupportChatGateway {
  constructor(
    private readonly supportRequestService: SupportRequestService,
  ) {}

  @WebSocketServer()
  server: Server;
  
  @Roles( Role.Client, Role.Manager )
  @UseGuards( WsJwtAuthGuard, WsRolesGuard )
  @SubscribeMessage('subscribeToChat')
  async handleMessage( 
      @MessageBody(new WsValidationPipe()) { chatId }: SubscribeToSupportRequestDto, 
      @ConnectedSocket() client: any) {      
        const _params = client.user.role === Role.Client ? {user: client.user, isActive: true} : {isActive: true}
        const supportRequests = await this.supportRequestService.findSupportRequests(_params)

        if ( supportRequests.every(el => el['_id'].toString() !== chatId) ) {
          throw new WsException('Некорректный chatId')
        } 

        const handler = (supportRequest, message) => {
          if (
            supportRequest === chatId
            && message.author._id.toString() !== client.user._id.toString()
            ) {
            client.emit('subscribeToChat', {supportRequest, message })
          }
        }

        this.supportRequestService.subscribe(handler)
        return { success: true }

  }
}