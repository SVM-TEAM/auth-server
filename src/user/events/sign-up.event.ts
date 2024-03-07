import { IEvent } from '@nestjs/cqrs';

export class SignUpEvent implements IEvent {
  constructor(public readonly userId: string) {}
}
