import { IQuery } from '@nestjs/cqrs';
import { SiteType } from '@prisma/client';

export class CheckUserIdQuery implements IQuery {
  constructor(
    public readonly userId: string,
    public readonly siteType: SiteType,
  ) {}
}
