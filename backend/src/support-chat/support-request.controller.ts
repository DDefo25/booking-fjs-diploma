import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SupportRequestClientService } from './support-request-client/support-request-client.service';
import { SupportRequestService } from './support-request/support-request.service';
import { SupportRequestEmployeeService } from './support-request-employee/support-request-employee.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/http.roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { HttpValidationPipe } from 'src/validation/http.validation.pipe';
import { CreateClientSupportRequestDto } from './interfaces/create-client-support-request.dto';
import { SearchSupportRequestParams } from './support-request/interfaces/search-support-request.dto';
import { ObjectId } from 'mongoose';

@Controller('api/:role/support-requests')
export class SupportRequestController {
  constructor(
    private readonly supportRequest: SupportRequestService,
    private readonly supportRequestClient: SupportRequestClientService,
    private readonly supportRequestEmployee: SupportRequestEmployeeService,
  ) {}

  @Roles(Role.Client)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createSupportRequest(
    @Body(new HttpValidationPipe()) data: CreateClientSupportRequestDto,
    @Req() req,
  ) {
    const newSupportRequest =
      await this.supportRequestClient.createSupportRequest({
        user: req.user._id,
        text: data.text,
      });
    const unreadCount = await this.supportRequestClient.getUnreadCount(
      newSupportRequest['_id'],
    );
    return {
      id: newSupportRequest['_id'],
      createdAt: newSupportRequest['createdAt'],
      isActive: newSupportRequest.isActive,
      hasNewMessages: unreadCount.length > 0,
    };
  }

  @Roles(Role.Client, Role.Manager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getSupportRequest(
    @Query() query: SearchSupportRequestParams,
    @Req() req,
    @Param('role') role: Partial<Role>,
  ) {
    const response = [];
    let count: number;

    switch (role) {
      case Role.Client: {
        const { supportRequests, count: countClientSR } =
          await this.supportRequest.findSupportRequests({
            user: req.user._id,
            ...query,
          });
        for (const el of supportRequests) {
          const unreadCount = await this.supportRequestClient.getUnreadCount(
            el._id,
          );
          response.push({
            id: el._id,
            createdAt: el['createdAt'],
            isActive: el.isActive,
            hasNewMessages: unreadCount.length > 0,
          });
        }
        count = countClientSR;
        break;
      }

      case Role.Manager: {
        const { supportRequests, count: countManagerSR } =
          await this.supportRequest.findSupportRequests(query);
        for (const el of supportRequests) {
          const unreadCount = await this.supportRequestEmployee.getUnreadCount(
            el._id,
          );
          response.push({
            id: el._id,
            createdAt: el['createdAt'],
            isActive: el.isActive,
            hasNewMessages: unreadCount.length > 0,
            client: el.user,
          });
        }
        count = countManagerSR;
        break;
      }
    }
    return {
      supportRequests: response,
      count,
    };
  }

  // GET /api/common/support-requests/:id/messages
  @Roles(Role.Client, Role.Manager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id/messages')
  async getMessagesById(@Param('id') supportRequest: ObjectId, @Req() req) {
    const { user } = req;
    switch (user.role) {
      case Role.Client: {
        return await this.supportRequest.getMessages({
          _id: supportRequest,
          user: user,
        });
      }
      case Role.Manager: {
        return await this.supportRequest.getMessages({ _id: supportRequest });
      }
    }
  }

  //POST /api/common/support-requests/:id/messages
  @Roles(Role.Client, Role.Manager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':id/messages')
  async sendMessage(
    @Param('id') supportRequest: ObjectId,
    @Req() req,
    @Body(new HttpValidationPipe()) { text },
  ) {
    return await this.supportRequest.sendMessage({
      text,
      author: req.user,
      supportRequest,
    });
  }

  //POST /api/common/support-requests/:id/messages/read
  @Roles(Role.Client, Role.Manager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':id/messages/read')
  async readMessages(
    @Param('id') supportRequest: ObjectId,
    @Req() req,
    @Body(new HttpValidationPipe()) { createdBefore },
  ) {
    const { user } = req;
    try {
      switch (user.role) {
        case Role.Client: {
          await this.supportRequestClient.markMessagesAsRead({
            supportRequest,
            user,
            createdBefore: new Date(createdBefore),
          });
          break;
        }
        case Role.Manager: {
          await this.supportRequestEmployee.markMessagesAsRead({
            supportRequest,
            user,
            createdBefore: new Date(createdBefore),
          });
          break;
        }
      }
    } catch (e) {
      return { success: false, error: e };
    }
    return { success: true };
  }

  //POST /api/common/support-requests/:id/close
  @Roles(Role.Manager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':id/close')
  async closeSupportRequest(@Param('id') supportRequest: ObjectId) {
    return await this.supportRequestEmployee.closeRequest(supportRequest);
  }
}
