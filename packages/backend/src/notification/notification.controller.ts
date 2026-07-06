import { Controller, Get, Post, Param, Delete, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationService } from './notification.service';

@ApiTags('通知')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  async getNotifications(@Request() req: { user: { id: number } }) {
    return this.notificationService.findByUserId(req.user.id);
  }

  @Get('unread')
  async getUnreadNotifications(@Request() req: { user: { id: number } }) {
    return this.notificationService.findUnreadByUserId(req.user.id);
  }

  @Get('unread/count')
  async countUnread(@Request() req: { user: { id: number } }) {
    return this.notificationService.countUnread(req.user.id);
  }

  @Post(':id/read')
  async markAsRead(@Request() req: { user: { id: number } }, @Param('id') id: number) {
    return this.notificationService.markAsRead(req.user.id, id);
  }

  @Post('read-all')
  async markAllAsRead(@Request() req: { user: { id: number } }) {
    return this.notificationService.markAllAsRead(req.user.id);
  }

  @Delete(':id')
  async deleteNotification(@Request() req: { user: { id: number } }, @Param('id') id: number) {
    return this.notificationService.delete(req.user.id, id);
  }
}