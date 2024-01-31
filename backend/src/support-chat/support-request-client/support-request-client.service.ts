import { Inject, Injectable } from '@nestjs/common';
import { Message, MessageDocument } from '../schemas/message.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Mongoose, ObjectId, Types } from 'mongoose';
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
        await this.supportRequestService.sendMessage({
            author: user, 
            text, 
            supportRequest: supportRequest._id})

        return supportRequest
    };

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
    };

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
                        {$ne: [{ $toObjectId: '$$user'}, { $toObjectId: '$author'}]},
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
    };
}

