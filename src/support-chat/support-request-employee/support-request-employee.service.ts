import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SupportRequest, SupportRequestDocument } from '../schemas/support-request.schema';
import { Model, ObjectId } from 'mongoose';
import { Message, MessageDocument } from '../schemas/message.schema';
import { MarkMessageAsReadDto } from '../interfaces/mark-message-as-read.dto';

@Injectable()
export class SupportRequestEmployeeService {
    constructor (
        @InjectModel( SupportRequest.name ) private readonly supportRequestModel: Model<SupportRequestDocument>
    ) {}

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
                'i.author': user
              }
            ]
        };

        const result = await this.supportRequestModel.updateOne(query, updateDocument, options);
    }
    
    async getUnreadCount(supportRequest: ObjectId): Promise<Message[]> {
        const query = { 
            _id: supportRequest,
            messages: { $elemMatch: { 
                readAt: { $exists: false }, 
                author: '$user' 
            }}
        }

        return await this.supportRequestModel.find(query)
    }

    async closeRequest(supportRequest: ObjectId): Promise<void> {
        return await this.supportRequestModel.findByIdAndUpdate(supportRequest, { isActive: false });
    }
}
