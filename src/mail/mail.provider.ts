import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

@Injectable()
export class MailProvider {
  constructor(private readonly configService: ConfigService) {}

  getDefaultTransport(): Transporter {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: this.configService.get<number>('AUTH_MAIL_PORT'),
      host: this.configService.get<string>('AUTH_MAIL_HOST'),
      auth: {
        user: this.configService.get<string>('AUTH_MAIL_USER_ID'),
        pass: this.configService.get<string>('AUTH_MAIL_PASSWORD'),
      },
    });
    return transporter;
  }
}
