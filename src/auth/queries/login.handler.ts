import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { LoginQuery } from './login.query';
import { PrismaService } from 'src/public/prisma/prisma.service';
import { AuthService } from '../auth.service';
import { HeaderToken } from 'src/public/interfaces/common.interface';
import * as bcrypt from 'bcrypt';

@QueryHandler(LoginQuery)
export class LoginQueryHandler implements IQueryHandler<LoginQuery> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async execute(query: LoginQuery): Promise<HeaderToken> {
    const user = await this.prisma.user.findUnique({
      where: {
        userIdSiteType: {
          userId: query.userId,
          siteType: query.siteType,
        },
      },
      include: {
        verifyCode: true,
      },
    });
    const isValidPassword: boolean = user
      ? await bcrypt.compare(query.password, user.password)
      : false;

    if (!isValidPassword) throw new Error('유효한 유저가 아닙니다.');
    if (!user.verifyCode.isVerify)
      throw new Error('이메일 인증을 먼저 시도해주세요.');

    return this.authService.authentication(user.userSeq);
  }
}
