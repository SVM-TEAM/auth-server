import { ICommand } from '@nestjs/cqrs';
import { AuthProvider, SiteType } from '@prisma/client';

export class SignUpCommand implements ICommand {
  readonly userId: string;
  readonly password: string;
  readonly siteType: SiteType;
  readonly loginProvider: AuthProvider;

  constructor(signUpCommand: SignUpCommand) {
    Object.assign(this, signUpCommand);
  }
}
