import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { LoginQuery } from './queries/login.query';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import {
  HeaderToken,
  LoginResult,
} from 'src/public/interfaces/common.interface';
import {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';
import { LoginHistoryEvent } from './events/login-history.event';
import { ApiTags } from '@nestjs/swagger';
import { EmailAuthenticationCommand } from './commands/email-authentication.command';
import { BaseResponse } from 'src/public/responses/response';

@Controller('auth')
@ApiTags('인증 api')
export class AuthController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Post('login')
  @HttpCode(201)
  async login(
    @Body() loginQuery: LoginQuery,
    @Req() req: ExpressRequest,
    @Res() res: ExpressResponse,
  ) {
    const loginResult: LoginResult = { success: false };
    try {
      const { accessToken, refreshToken }: HeaderToken =
        await this.queryBus.execute(new LoginQuery(loginQuery));
      loginResult.success = true;
      loginResult.accessToken = accessToken;
      loginResult.refreshToken = refreshToken;
    } catch (e) {
      loginResult.failerErrorStatus = e.response;
    } finally {
      const loginHistoryDto: LoginHistoryEvent = {
        userId: loginQuery.userId,
        siteType: loginQuery.siteType,
        ipAddress: req.ip,
        success: loginResult.success,
        code: loginResult.success ? 1000 : loginResult.failerErrorStatus.code,
        userAgent: req.headers['user-agent'],
      };
      await this.eventBus.publish(new LoginHistoryEvent(loginHistoryDto));
      if (loginResult.success) {
        res.cookie('access_token', loginResult.accessToken, { httpOnly: true });
        res.cookie('refresh_token', loginResult.refreshToken, {
          httpOnly: true,
        });
        res.send();
      } else res.status(401).send(loginResult.failerErrorStatus);
    }
  }

  @Get('email/authentication')
  async emailAuthentication(@Query('verifyCode') verifyCode: string) {
    const result: { code: number; userId: string } =
      await this.commandBus.execute(new EmailAuthenticationCommand(verifyCode));
    return new BaseResponse<string>(result.userId, result.code);
  }
}
