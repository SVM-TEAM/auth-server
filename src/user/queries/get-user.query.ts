import { IQuery } from '@nestjs/cqrs';
import { SiteType } from '@prisma/client';

export class GetUserQuery implements IQuery {
  constructor(
    public readonly userId: string,
    public readonly siteType: SiteType,
  ) {}
}
