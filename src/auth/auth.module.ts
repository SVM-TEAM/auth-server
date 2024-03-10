import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { LoginQueryHandler } from './queries/login.handler';
import { LoginHistoryEventHandler } from './events/login-history.handler';
import { EmailAuthenticationCommandHandler } from './commands/email-authentication.handler';

@Module({
  imports: [
    JwtModule.register({
      privateKey: process.env.JWT_PRIVATE_SECRET,
      signOptions: { algorithm: 'RS256', expiresIn: '15m' },
    }),
  ],
  providers: [
    AuthService,
    LoginQueryHandler,
    LoginHistoryEventHandler,
    EmailAuthenticationCommandHandler,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
