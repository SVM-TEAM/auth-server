import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CheckUserIdQueryHandler } from './queries/check-user-id.handler';
import { SignUpCommandHandler } from './commands/sign-up.handler';
import { SignUpEventHandler } from './events/sign-up.handler';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [MailModule],
  controllers: [UserController],
  providers: [
    UserService,
    CheckUserIdQueryHandler,
    SignUpCommandHandler,
    SignUpEventHandler,
  ],
})
export class UserModule {}
