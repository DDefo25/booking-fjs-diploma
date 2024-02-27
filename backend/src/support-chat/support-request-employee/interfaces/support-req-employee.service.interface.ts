import { ObjectId } from 'mongoose';
import { MarkMessageAsReadDto } from 'src/support-chat/interfaces/mark-message-as-read.dto';
import { Message } from 'src/support-chat/schemas/message.schema';

export interface ISupportRequestEmployeeService {
  markMessagesAsRead(params: MarkMessageAsReadDto);
  getUnreadCount(supportRequest: ObjectId): Promise<Message[]>;
  closeRequest(supportRequest: ObjectId): Promise<void>;
}
