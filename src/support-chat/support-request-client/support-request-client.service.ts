import { Inject, Injectable } from '@nestjs/common';
import { Message, MessageDocument } from '../schemas/message.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { SupportRequest, SupportRequestDocument } from '../schemas/support-request.schema';
import { CreateSupportRequestDto } from '../interfaces/create-support-request.dto';
import { MarkMessageAsReadDto } from '../interfaces/mark-message-as-read.dto';
import { SupportRequestService } from '../support-request/support-request.service';

@Injectable()
export class SupportRequestClientService {
    constructor(
        @InjectModel(Message.name) private readonly messageModel: Model<MessageDocument>,
        @InjectModel(SupportRequest.name) private readonly supportRequestModel: Model<SupportRequestDocument>,
        private readonly supportRequestService: SupportRequestService
    ) {}

    async createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest> {
        const {user, text} = data;
        const supportRequest = await this.supportRequestModel.create({ user })
        return await this.supportRequestService.sendMessage({
            author: user, 
            text, 
            supportRequest: supportRequest._id}).then(() => supportRequest)


    };

    async markMessagesAsRead(params: MarkMessageAsReadDto) {
        const {user, supportRequest: supportRequestID, createdBefore} = params
        const query = { _id: supportRequestID }
        const updateDocument = {
            $mul: { "messages.$[i].readAt": new Date() }
        };
        const options = {
            arrayFilters: [
              {
                "i.readAt": { $exists: false },
                'i.author': { $not: user }
              }
            ]
        };

        const result = await this.supportRequestModel.updateOne(query, updateDocument, options);

        // const supportRequest = await this.supportRequestModel.findOneAndUpdate(supportRequestID, {
        //     $set: {
        //         messages
        //     }
        // });
        // const messages = supportRequest.populate('messages')
        // await messages.forEach(element => {
        //     update
        // });
    };

    async getUnreadCount(supportRequest: ObjectId): Promise<Message[]> {
        const query = { 
            _id: supportRequest,
            messages: { $elemMatch: { 
                readAt: { $exists: false }, 
                author: { $ne: '$user' }
            }}
        }

        return await this.supportRequestModel.find(query)
    };
}
