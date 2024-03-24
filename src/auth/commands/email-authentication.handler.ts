import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EmailAuthenticationCommand } from './email-authentication.command';
import { PrismaService } from 'src/public/prisma/prisma.service';
import axios from 'axios';

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
          userSeq: true,
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
      try {
        await axios.post('http://localhost:3050/api/user/init', {
          userSeq: existingEmailAuthenticationUser.userSeq,
        });
      } catch (e) {
        throw new Error('인증 과정에서 실패했습니다.'); // TODO
      }
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
