import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SupportRequest, SupportRequestDocument } from '../schemas/support-request.schema';
import { Model, ObjectId } from 'mongoose';
import { Message, MessageDocument } from '../schemas/message.schema';
import { MarkMessageAsReadDto } from '../interfaces/mark-message-as-read.dto';

@Injectable()
export class SupportRequestEmployeeService {
    constructor (
        @InjectModel( SupportRequest.name ) private readonly supportRequestModel: Model<SupportRequestDocument>,
        @InjectModel(Message.name) private readonly messageModel: Model<MessageDocument>,
    ) {}

    async markMessagesAsRead(params: MarkMessageAsReadDto) {
        const {user, supportRequest, createdBefore} = params
        const supportReq = await this.supportRequestModel.findById(supportRequest)
        for (let message of supportReq.messages) {
            await this.messageModel.updateOne(
                { $and: [
                    { _id: message },
                    { readAt: { $exists: false}}, 
                    { author: { $ne: user }}
                ]},
                { $set: { 'readAt': createdBefore} },
            )
        }
    }
    
    async getUnreadCount(supportRequest: ObjectId): Promise<Message[]> {
        const supportReq = await this.supportRequestModel.aggregate([
            { $match: { _id: supportRequest }},
            { $lookup: {
                from: 'messages',
                localField: 'messages',
                foreignField: '_id',
                let: {
                    user: '$user'
                },
                pipeline: [
                { $match: {
                    $expr:{ $and: [
                        {$eq: [{ $toObjectId: '$$user'}, { $toObjectId: '$author'}]},
                        {$cond: [
                            {$ifNull: ['$readAt', true]},
                                true,
                                false
                        ]}
                    ]},
                }},
                ],
                as: "messages"
            }},
        ])
        return supportReq[0].messages
    }

    async closeRequest(supportRequest: ObjectId): Promise<void> {
        return await this.supportRequestModel.findByIdAndUpdate(supportRequest, { isActive: false });
    }
}
