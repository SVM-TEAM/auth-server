import { IEvent } from '@nestjs/cqrs';
import { SiteType } from '@prisma/client';

export class LoginHistoryEvent implements IEvent {
  readonly userId: string;
  readonly siteType: SiteType;
  readonly ipAddress: string;
  readonly success: boolean;
  readonly userAgent: string;
  readonly code: number;

  constructor(loginHistoryEvent: LoginHistoryEvent) {
    Object.assign(this, loginHistoryEvent);
  }
}
