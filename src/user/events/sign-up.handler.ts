import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SignUpEvent } from './sign-up.event';
import { MailService } from 'src/mail/mail.service';
import Mail from 'nodemailer/lib/mailer';

@EventsHandler(SignUpEvent)
export class SignUpEventHandler implements IEventHandler<SignUpEvent> {
  constructor(private readonly mailService: MailService) {}
  async handle(event: SignUpEvent) {
    const CREATE_USER_MAIL_HTML = 'hello world'; // TODO
    const mailDto: Mail.Options = {
      to: event.userId,
      subject: CREATE_USER_MAIL_HTML,
      html: CREATE_USER_MAIL_HTML,
    };
    await this.mailService.send(mailDto);
  }
}
