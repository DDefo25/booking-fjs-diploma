import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { SupportRequestClientService } from './support-request-client/support-request-client.service';
import { SupportRequestService } from './support-request/support-request.service';
import { SupportRequestEmployeeService } from './support-request-employee/support-request-employee.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { HttpValidationPipe } from 'src/validation/http.validation.pipe';
import { CreateClientSupportRequestDto } from './interfaces/create-client-support-request.dto';

@Controller('api/:role/support-requests')
export class SupportRequestController {
    constructor (
        private readonly supportRequest: SupportRequestService,
        private readonly supportRequestClient: SupportRequestClientService,
        private readonly supportRequestEmployee: SupportRequestEmployeeService
    ) {}

    @Roles(Role.Client)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async createSupportRequest(@Body(new HttpValidationPipe()) data: CreateClientSupportRequestDto, @Req() req) {
        return await this.supportRequestClient.createSupportRequest({user: req.user._id, text: data.text})
    }
}
