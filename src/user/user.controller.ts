import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { SiteType } from '@prisma/client';
import { UserService } from './user.service';
import { SignUpCommand } from './commands/sign-up.command';

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

  @Post('sign-up')
  @HttpCode(201)
  async signUpUser(@Body() dto: SignUpCommand) {
    return this.userService.create(dto);
  }
}
