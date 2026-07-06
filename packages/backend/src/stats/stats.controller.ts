import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StatsService } from './stats.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { UserPayload } from '../auth/types/user.type';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('统计')
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async getUserStats(@GetUser() user: UserPayload) {
    return this.statsService.getUserStats(user.sub);
  }

  @Get('user/trend')
  @UseGuards(JwtAuthGuard)
  async getUserActivityTrend(@GetUser() user: UserPayload, @Query('days') days?: number) {
    return this.statsService.getUserActivityTrend(user.sub, days || 7);
  }

  @Get('global')
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  async getGlobalStats() {
    return this.statsService.getGlobalStats();
  }
}