import { ICommand } from '@nestjs/cqrs';

export class EmailAuthenticationCommand implements ICommand {
  constructor(public readonly verifyCode: string) {}
}
