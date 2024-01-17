import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SupportRequest, SupportRequestDocument } from '../schemas/support-request.schema';
import { Model, ObjectId } from 'mongoose';
import { ISupportRequestService } from './interfaces/support-req.service.interface';
import { GetChatListParams } from '../interfaces/get-chat-list.dto';
import { SendMessageDto } from '../interfaces/send-message.dto';
import { Message, MessageDocument } from '../schemas/message.schema';

@Injectable()
export class SupportRequestService implements ISupportRequestService {
    constructor(
        @InjectModel(SupportRequest.name) private readonly supportRequestModel: Model<SupportRequestDocument>,
        @InjectModel(Message.name) private readonly messagetModel: Model<MessageDocument>
    ) {}

    findSupportRequests(_params: GetChatListParams): Promise<SupportRequest[]> {
        return this.supportRequestModel.find(_params)
    };
    
    sendMessage(data: SendMessageDto): Promise<Message> {

    };

    async getMessages(supportRequest: ObjectId): Promise<Message[]> {
        const supportReq = await this.supportRequestModel.findById(supportRequest).populate('messages')
        return supportReq.messages
    };

    subscribe(handler: (supportRequest: SupportRequest, message: Message) => void): () => void {

    };
}
