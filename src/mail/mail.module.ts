import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailProvider } from './mail.provider';

@Module({
  providers: [
    MailService,
    {
      provide: 'MAILER_TRANSPORT',
      useClass: MailProvider,
    },
  ],
  exports: [MailService],
})
export class MailModule {}
