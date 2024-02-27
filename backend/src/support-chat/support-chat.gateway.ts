import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsException,
} from '@nestjs/websockets';
import { SupportRequestService } from './support-request/support-request.service';
import { Socket } from 'socket.io';
import { UseFilters, UseGuards } from '@nestjs/common';
import { WsRolesGuard } from 'src/auth/guards/ws.roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { WsExceptionFilter } from 'src/exceptions/ws.exception.filter';
import { WsJwtAuthGuard } from 'src/auth/guards/ws.jwt-auth.guard';
import { WsValidationPipe } from 'src/validation/ws.validation.pipe';
import { SubscribeToSupportRequestDto } from './interfaces/subscribe-support-request.dto';
import { UserDocument } from 'src/user/schemas/user.schema';

type SocketWithUser = Socket & { user: UserDocument };

@UseFilters(new WsExceptionFilter())
@WebSocketGateway({
  cookie: true,
  cors: true,
})
export class SupportChatGateway {
  constructor(private readonly supportRequestService: SupportRequestService) {}

  @Roles(Role.Client, Role.Manager)
  @UseGuards(WsJwtAuthGuard, WsRolesGuard)
  @SubscribeMessage('subscribeToChat')
  async subscribeToChat(
    @MessageBody(new WsValidationPipe())
    { chatId }: SubscribeToSupportRequestDto,
    @ConnectedSocket() client: SocketWithUser,
  ) {
    const _params =
      client.user.role === Role.Client
        ? { user: client.user._id, isActive: true }
        : { isActive: true };
    const data = await this.supportRequestService.findSupportRequests(_params);

    if (data.supportRequests.every((el) => el._id.toString() !== chatId)) {
      throw new WsException('Некорректный chatId');
    }

    client.join(chatId);
    return { success: true };
  }
}
