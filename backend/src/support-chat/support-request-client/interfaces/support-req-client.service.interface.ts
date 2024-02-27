import { ObjectId } from 'mongoose';
import { CreateSupportRequestDto } from 'src/support-chat/interfaces/create-support-request.dto';
import { MarkMessageAsReadDto } from 'src/support-chat/interfaces/mark-message-as-read.dto';
import { Message } from 'src/support-chat/schemas/message.schema';
import { SupportRequest } from 'src/support-chat/schemas/support-request.schema';

export interface ISupportRequestClientService {
  createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest>;
  markMessagesAsRead(params: MarkMessageAsReadDto);
  getUnreadCount(supportRequest: ObjectId): Promise<Message[]>;
}
