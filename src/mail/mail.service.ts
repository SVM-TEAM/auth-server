import { Inject, Injectable } from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';
import { MailProvider } from './mail.provider';

@Injectable()
export class MailService {
  constructor(
    @Inject('MAILER_TRANSPORT') private readonly mailProvider: MailProvider,
  ) {}
  async send(dto: Mail.Options): Promise<void> {
    const trnasport = this.mailProvider.getDefaultTransport();
    await trnasport.sendMail(dto);
  }
}
