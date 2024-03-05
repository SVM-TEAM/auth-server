import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CheckUserIdQuery } from './check-user-id.query';
import { PrismaService } from 'src/public/prisma/prisma.service';

@QueryHandler(CheckUserIdQuery)
export class CheckUserIdQueryHandler
  implements IQueryHandler<CheckUserIdQuery>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: CheckUserIdQuery): Promise<boolean> {
    const userCount = await this.prisma.user.count({
      where: {
        userId: query.userId,
        siteType: query.siteType,
      },
    });
    return userCount === 0;
  }
}
