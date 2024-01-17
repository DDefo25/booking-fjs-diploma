import { Module } from '@nestjs/common';
import { SupportRequestService } from './support-request/support-request.service';
import { SupportRequestClientService } from './support-request-client/support-request-client.service';
import { SupportRequestEmployeeService } from './support-request-employee/support-request-employee.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SupportRequest, SupportRequestSchema } from './schemas/support-request.schema';
import { Message, MessageSchema } from './schemas/message.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: SupportRequest.name, schema: SupportRequestSchema},
            {name: Message.name, schema: MessageSchema}            
        ])
    ],
    providers: [SupportRequestService, SupportRequestClientService, SupportRequestEmployeeService],
})
export class SupportChatModule {}
