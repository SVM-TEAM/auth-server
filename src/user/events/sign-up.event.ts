import { IEvent } from '@nestjs/cqrs';
import { SiteType } from '@prisma/client';

export class SignUpEvent implements IEvent {
  constructor(
    public readonly userId: string,
    public readonly siteType: SiteType,
  ) {}
}
