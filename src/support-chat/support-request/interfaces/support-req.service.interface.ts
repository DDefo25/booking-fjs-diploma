import { ObjectId } from "mongoose";
import { GetChatListParams } from "src/support-chat/interfaces/get-chat-list.dto";
import { SendMessageDto } from "src/support-chat/interfaces/send-message.dto";
import { Message } from "src/support-chat/schemas/message.schema";
import { SupportRequest } from "src/support-chat/schemas/support-request.schema";

export interface ISupportRequestService {
    findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]>;
    sendMessage(data: SendMessageDto): Promise<Message>;
    getMessages(supportRequest: ObjectId): Promise<Message[]>;
    subscribe(handler: (supportRequest: SupportRequest, message: Message) => void): () => void;
}