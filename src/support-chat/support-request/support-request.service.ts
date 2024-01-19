import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SupportRequest, SupportRequestDocument } from '../schemas/support-request.schema';
import { Model, ObjectId } from 'mongoose';
import { ISupportRequestService } from './interfaces/support-req.service.interface';
import { GetChatListParams } from '../interfaces/get-chat-list.dto';
import { SendMessageDto } from '../interfaces/send-message.dto';
import { Message, MessageDocument } from '../schemas/message.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class SupportRequestService implements ISupportRequestService {
    constructor(
        @InjectModel(SupportRequest.name) private readonly supportRequestModel: Model<SupportRequestDocument>,
        @InjectModel(Message.name) private readonly messagetModel: Model<MessageDocument>,
        private eventEmitter: EventEmitter2
    ) {}

    findSupportRequests(_params: GetChatListParams): Promise<SupportRequest[]> {
        return this.supportRequestModel.find(_params)
    };
    
    async sendMessage(data: SendMessageDto): Promise<Message> {
        const {author, supportRequest: supportReqID, text} = data;
        const message = await this.messagetModel.create({author, text});
        await this.supportRequestModel.findOneAndUpdate({
            _id: supportReqID
        }, {
            $push: { messages: message._id }
        });

        this.eventEmitter.emit('supportRequest.sendMessage', message);

        return message
    };

    //изменить тип на Promise<Message[]>
    async getMessages(supportRequest: ObjectId): Promise<any> {
        const supportReq = await this.supportRequestModel.findById(supportRequest).populate('messages')
        return supportReq.messages
    };

    subscribe(handler: (supportRequest: SupportRequest, message: Message) => void): () => void {
        return;
    };
}
