import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CheckUserIdQueryHandler } from './queries/check-user-id.handler';

@Module({
  controllers: [UserController],
  providers: [UserService, CheckUserIdQueryHandler],
})
export class UserModule {}
