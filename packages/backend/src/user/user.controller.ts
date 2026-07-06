import { Controller, Get, Put, Delete, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto';

@ApiTags('用户')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getMe(@Request() req: { user: { id: number } }) {
    return this.userService.getUserById(req.user.id);
  }

  @Put('me')
  async updateMe(@Request() req: { user: { id: number } }, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(req.user.id, dto);
  }

  @Delete('me')
  async deleteMe(@Request() req: { user: { id: number } }) {
    return this.userService.deleteUser(req.user.id);
  }
}
