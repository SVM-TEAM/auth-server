import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EmailAuthenticationCommand } from './email-authentication.command';
import { PrismaService } from 'src/public/prisma/prisma.service';

@CommandHandler(EmailAuthenticationCommand)
export class EmailAuthenticationCommandHandler
  implements ICommandHandler<EmailAuthenticationCommand>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    command: EmailAuthenticationCommand,
  ): Promise<{ code: number; userId: string }> {
    const existingEmailAuthenticationUser =
      await this.prisma.verifyCode.findUnique({
        where: {
          verifyCode: command.verifyCode,
        },
        select: {
          isVerify: true,
          user: {
            select: {
              userId: true,
            },
          },
        },
      });
    if (!existingEmailAuthenticationUser)
      throw new Error('유효하지 않는 인증 정보입니다.'); // TODO
    if (existingEmailAuthenticationUser.isVerify)
      return {
        code: 1001,
        userId: existingEmailAuthenticationUser.user.userId,
      };
    else {
      const emailAuthenticationUser = await this.prisma.verifyCode.update({
        where: {
          verifyCode: command.verifyCode,
        },
        data: {
          isVerify: true,
        },
        select: {
          user: {
            select: {
              userId: true,
            },
          },
        },
      });
      return {
        code: 1000,
        userId: emailAuthenticationUser.user.userId,
      };
    }
  }
}
