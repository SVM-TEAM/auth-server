import { IQuery } from '@nestjs/cqrs';
import { AuthProvider, SiteType } from '@prisma/client';

export class LoginQuery implements IQuery {
  readonly userId: string;
  readonly password: string;
  readonly siteType: SiteType;
  readonly loginProvider: AuthProvider;

  constructor(loginQuery: LoginQuery) {
    Object.assign(this, loginQuery);
  }
}
