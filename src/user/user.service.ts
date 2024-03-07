import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { CheckUserIdQuery } from './queries/check-user-id.query';
import { SignUpCommand } from './commands/sign-up.command';
import { SignUpEvent } from './events/sign-up.event';

@Injectable()
export class UserService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus,
  ) {}

  async checkUserIdDuplicaion(dto: CheckUserIdQuery): Promise<boolean> {
    return this.queryBus.execute(
      new CheckUserIdQuery(dto.userId, dto.siteType),
    );
  }

  async create(dto: SignUpCommand): Promise<void> {
    await this.commandBus.execute(new SignUpCommand(dto));
    await this.eventBus.publish(new SignUpEvent(dto.userId));
  }
}
