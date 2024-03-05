import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { CheckUserIdQuery } from './queries/check-user-id.query';

@Injectable()
export class UserService {
  constructor(private readonly queryBus: QueryBus) {}

  async checkUserIdDuplicaion(dto: CheckUserIdQuery): Promise<boolean> {
    return this.queryBus.execute(
      new CheckUserIdQuery(dto.userId, dto.siteType),
    );
  }
}
