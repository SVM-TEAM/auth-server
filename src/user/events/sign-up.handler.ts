import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SignUpEvent } from './sign-up.event';
import { MailService } from 'src/mail/mail.service';
import Mail from 'nodemailer/lib/mailer';
import { signUpUserMailForm } from 'src/public/html-forms/mail.form';
import { PrismaService } from 'src/public/prisma/prisma.service';
@EventsHandler(SignUpEvent)
export class SignUpEventHandler implements IEventHandler<SignUpEvent> {
  constructor(
    private readonly mailService: MailService,
    private readonly prisma: PrismaService,
  ) {}
  async handle(event: SignUpEvent) {
    const { userSeq } = await this.prisma.user.findUnique({
      where: {
        userIdSiteType: {
          userId: event.userId,
          siteType: event.siteType,
        },
      },
      select: {
        userSeq: true,
      },
    });
    const { name: siteName } = await this.prisma.site.findUnique({
      where: { siteType: event.siteType },
      select: { name: true },
    });
    const { verifyCode } = await this.prisma.verifyCode.create({
      data: {
        userSeq,
      },
      select: { verifyCode: true },
    });
    const CREATE_USER_MAIL_HTML = signUpUserMailForm(siteName, verifyCode);
    const mailDto: Mail.Options = {
      to: event.userId,
      subject: `${siteName} 서비스 이용 관련 인증`,
      html: CREATE_USER_MAIL_HTML,
    };
    await this.mailService.send(mailDto);
  }
}
