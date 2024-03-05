import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { SiteType } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('check-duplication')
  @HttpCode(200)
  async checkDuplicationUserId(
    @Query('siteType') siteType: SiteType,
    @Query('userId') userId: string,
  ) {
    return this.userService.checkUserIdDuplicaion({ userId, siteType });
  }
}
