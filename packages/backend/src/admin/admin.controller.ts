import { Controller, Get, Put, Delete, Query, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('管理后台')
@Controller('admin')
@UseGuards(JwtAuthGuard)
@Roles('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  async getUsers(@Query('page') page?: number, @Query('pageSize') pageSize?: number) {
    return this.adminService.getUsers(page || 1, pageSize || 20);
  }

  @Get('users/:id')
  async getUserDetail(@Param('id') id: number) {
    return this.adminService.getUserDetail(id);
  }

  @Put('users/:id/role')
  async updateUserRole(@Param('id') id: number, @Body() body: { role: string }) {
    return this.adminService.updateUserRole(id, body.role);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: number) {
    await this.adminService.deleteUser(id);
    return { message: '删除成功' };
  }
}