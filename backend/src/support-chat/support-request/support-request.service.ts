import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  SupportRequest,
  SupportRequestDocument,
} from '../schemas/support-request.schema';
import { Model, ObjectId } from 'mongoose';
import { ISupportRequestService } from './interfaces/support-req.service.interface';
import { GetChatListParams } from '../interfaces/get-chat-list.dto';
import { SendMessageDto } from '../interfaces/send-message.dto';
import { Message, MessageDocument } from '../schemas/message.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GetMessagesParams } from '../interfaces/get-messages.dto';
import { SocketService } from '../../socket/socket.service';

@Injectable()
export class SupportRequestService implements ISupportRequestService {
  constructor(
    @InjectModel(SupportRequest.name)
    readonly supportRequestModel: Model<SupportRequestDocument>,
    @InjectModel(Message.name) readonly messagetModel: Model<MessageDocument>,
    private readonly socketService: SocketService,
    private eventEmitter: EventEmitter2,
  ) {}

  async findSupportRequests({
    limit,
    offset,
    ..._params
  }: GetChatListParams): Promise<{
    supportRequests: SupportRequestDocument[];
    count: number;
  }> {
    return {
      count: await this.supportRequestModel.countDocuments(_params),
      supportRequests: await this.supportRequestModel
        .find(_params)
        .populate({ path: 'user', model: 'User' })
        .sort({ createdAt: 'desc' })
        .skip(offset)
        .limit(limit)
        .select('-user.passwordHash'),
    };
  }

  async sendMessage(data: SendMessageDto): Promise<Message> {
    const { author, supportRequest: supportReqID, text } = data;
    const message = await this.messagetModel.create({ author, text });
    await this.supportRequestModel.findOneAndUpdate(
      {
        _id: supportReqID,
      },
      {
        $push: { messages: message._id },
      },
    );

    this.socketService.server
      .to(supportReqID.toString())
      .emit('subscribeToChat', { supportReqID, message });

    return message;
  }

  async getMessages(_params: GetMessagesParams): Promise<any[]> {
    const supportRequest = await this.supportRequestModel
      .find(_params)
      .populate({
        path: 'messages',
        model: 'Message',
        populate: {
          path: 'author',
          model: 'User',
        },
      });
    return supportRequest[0].messages;
  }

  subscribe(
    chatId: string,
    handler: (supportRequest: SupportRequest, message: Message) => any,
  ) {
    this.eventEmitter.on(`${chatId}.sendMessage`, handler);

    return () => {
      this.eventEmitter.off(`${chatId}.sendMessage`, handler);
    };
  }
}
