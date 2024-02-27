import { Module } from '@nestjs/common';
import { SupportRequestService } from './support-request/support-request.service';
import { SupportRequestClientService } from './support-request-client/support-request-client.service';
import { SupportRequestEmployeeService } from './support-request-employee/support-request-employee.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SupportRequest,
  SupportRequestSchema,
} from './schemas/support-request.schema';
import { Message, MessageSchema } from './schemas/message.schema';
import { SupportRequestController } from './support-request.controller';
import { SupportChatGateway } from './support-chat.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SupportRequest.name, schema: SupportRequestSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  controllers: [SupportRequestController],
  providers: [
    SupportRequestService,
    SupportRequestClientService,
    SupportRequestEmployeeService,
    SupportChatGateway,
  ],
  exports: [SupportChatGateway],
})
export class SupportChatModule {}
