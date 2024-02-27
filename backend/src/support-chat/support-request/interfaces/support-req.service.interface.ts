import { GetChatListParams } from 'src/support-chat/interfaces/get-chat-list.dto';
import { GetMessagesParams } from 'src/support-chat/interfaces/get-messages.dto';
import { SendMessageDto } from 'src/support-chat/interfaces/send-message.dto';
import { Message } from 'src/support-chat/schemas/message.schema';
import { SupportRequest } from 'src/support-chat/schemas/support-request.schema';

export interface ISupportRequestService {
  findSupportRequests(
    params: GetChatListParams,
  ): Promise<{ supportRequests: SupportRequest[]; count: number }>;
  sendMessage(data: SendMessageDto): Promise<Message>;
  getMessages(_params: GetMessagesParams): Promise<Message[]>;
  subscribe(
    chatId: string,
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): void;
}
