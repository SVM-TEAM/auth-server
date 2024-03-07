import { Body, Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import { LoginQuery } from './queries/login.query';
import { EventBus, QueryBus } from '@nestjs/cqrs';
import {
  BaseExceptionErrorStateInferface,
  HeaderToken,
} from 'src/public/interfaces/common.interface';
import {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';
import { LoginHistoryEvent } from './events/login-history.event';

interface LoginResult {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  failerErrorStatus?: BaseExceptionErrorStateInferface;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
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
      console.log(e);
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
}
