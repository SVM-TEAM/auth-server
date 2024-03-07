import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { LoginHistoryEvent } from './login-history.event';
import { PrismaService } from 'src/public/prisma/prisma.service';

@EventsHandler(LoginHistoryEvent)
export class LoginHistoryEventHandler
  implements IEventHandler<LoginHistoryEvent>
{
  constructor(private readonly prisma: PrismaService) {}

  async handle(event: LoginHistoryEvent) {
    await this.prisma.loginHistory.create({
      data: { ...event },
    });
  }
}
