import { Controller, Post, Body, Get, Put, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, ForgotPasswordDto, ResetPasswordDto } from './dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetUser } from './decorators/get-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserPayload } from './types/user.type';

@ApiTags('认证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @Post('refresh-token')
  async refreshToken(@Body() body: { refreshToken: string }) {
    return this.authService.refreshToken(body.refreshToken);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@GetUser() user: UserPayload) {
    return this.authService.getProfile(user.sub);
  }

  @Put('me')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@GetUser() user: UserPayload, @Body() body: { username?: string; email?: string }) {
    return this.authService.updateProfile(user.sub, body);
  }

  @Post('me/avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@GetUser() user: UserPayload, @UploadedFile() file: Express.Multer.File) {
    return this.authService.uploadAvatar(user.sub, file);
  }

  @Post('me/change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(@GetUser() user: UserPayload, @Body() body: { oldPassword: string; newPassword: string }) {
    return this.authService.changePassword(user.sub, body.oldPassword, body.newPassword);
  }
}
