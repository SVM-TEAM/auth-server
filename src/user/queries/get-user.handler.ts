import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from './get-user.query';
import { PrismaService } from 'src/public/prisma/prisma.service';
import { User } from '@prisma/client';

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetUserQuery): Promise<User> {
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

    return user;
  }
}
