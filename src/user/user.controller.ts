import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { SiteType } from '@prisma/client';
import { UserService } from './user.service';
import { SignUpCommand } from './commands/sign-up.command';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BaseResponse } from 'src/public/responses/response';
import { PrismaException } from 'src/public/exceptions/prisma.exception';

@Controller('user')
@ApiTags('유저 API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('check-duplication')
  @HttpCode(200)
  @ApiOperation({
    summary: '유저 아이디 중복 체크 API',
    description: '유저의 아이디가 중복으로 가입되어 있는지 체크합니다.',
  })
  @ApiQuery({
    name: 'siteType',
    description: '사이트 정보',
    required: true,
  })
  @ApiQuery({ name: 'userId', description: '유저 아이디', required: true })
  @ApiResponse({ type: BaseResponse })
  async checkDuplicationUserId(
    @Query('siteType')
    siteType: SiteType,
    @Query('userId') userId: string,
  ) {
    const isDuplication = await this.userService.checkUserIdDuplicaion({
      userId,
      siteType,
    });

    return BaseResponse.success<boolean>(isDuplication);
  }

  @Post('sign-up')
  @HttpCode(201)
  async signUpUser(@Body() dto: SignUpCommand) {
    try {
      await this.userService.create(dto);
      return BaseResponse.success<boolean>(true);
    } catch (e) {
      throw new PrismaException(e);
    }
  }
}
