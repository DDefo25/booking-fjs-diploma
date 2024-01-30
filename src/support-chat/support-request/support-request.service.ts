import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SupportRequest, SupportRequestDocument } from '../schemas/support-request.schema';
import { Model, ObjectId } from 'mongoose';
import { ISupportRequestService } from './interfaces/support-req.service.interface';
import { GetChatListParams } from '../interfaces/get-chat-list.dto';
import { SendMessageDto } from '../interfaces/send-message.dto';
import { Message, MessageDocument } from '../schemas/message.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GetMessagesParams } from '../interfaces/get-messages.dto';

@Injectable()
export class SupportRequestService implements ISupportRequestService {
    constructor(
        @InjectModel(SupportRequest.name) readonly supportRequestModel: Model<SupportRequestDocument>,
        @InjectModel(Message.name) readonly messagetModel: Model<MessageDocument>,
        private eventEmitter: EventEmitter2
    ) {}

    async findSupportRequests(_params: GetChatListParams): Promise<SupportRequest[]> {
        console.log(_params)
        return await this.supportRequestModel.find(_params)
        .populate({path: 'user', model: 'User'})
        .select('-user.passwordHash')

        // const aggregate = this.supportRequestModel.aggregate([
        //     { $match: _params }, 
        //     { $lookup: {
        //         from: "messages",
        //         localField: "messages",
        //         foreignField: "_id",
        //         let: {
        //             user: '$user'
        //         },
        //         pipeline: [
        //             { $match: {
        //                 $expr:{ $and: [
        //                     {$ne: [{ $toObjectId: '$$user'}, { $toObjectId: '$author'}]},
        //                     {$cond: [
        //                         {$ifNull: ['$readAt', true]},
        //                         true,
        //                         false
        //                     ]}
        //                 ]},
        //                 // { $expr: { $gt:["$readAt", null] }}
        //                 // readAt: { $exists: false }
        //             }},
        //         ],
        //         as: "newMessages"
        //     }},
        //     { $addFields: {
        //         countNewMessages: { $size: '$newMessages'},
        //         hasNewMessages: { $cond: [{ $gte: [{ $size: '$newMessages'}, 1]}, true, false]}
        //     }},
        // ])

        // if (projection) {
        //     return await aggregate.project(projection)
        // } else {
        //     return await aggregate
        // }
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

    async getMessages(_params: GetMessagesParams): Promise<any[]> {
        const supportRequest = await this.supportRequestModel.find(_params)
        .populate({
            path: 'messages', 
            model: 'Message', 
            populate: { 
                path: 'author', 
                model: 'User'
            }
        })
        return supportRequest[0].messages
    };

    subscribe(handler: (supportRequest: SupportRequest, message: Message) => void): () => void {
        return;
    };
}
