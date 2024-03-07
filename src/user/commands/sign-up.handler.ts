import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { SignUpCommand } from './sign-up.command';
import { CheckUserIdQuery } from '../queries/check-user-id.query';
import { PrismaService } from 'src/public/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@CommandHandler(SignUpCommand)
export class SignUpCommandHandler implements ICommandHandler<SignUpCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus,
    private readonly prisma: PrismaService,
  ) {}

  private async generateHashedPassword(password: string) {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  private async createUser(dto: SignUpCommand) {
    const hassedPassword = await this.generateHashedPassword(dto.password);
    await this.prisma.user.create({
      data: {
        userId: dto.userId,
        password: hassedPassword,
        siteType: dto.siteType,
      },
    });
  }

  async execute(command: SignUpCommand): Promise<void> {
    const isDuplicationUserId = await this.queryBus.execute(
      new CheckUserIdQuery(command.userId, command.siteType),
    );
    if (isDuplicationUserId > 0)
      throw new Error('이미 사용 중인 아이디입니다.');
    else this.createUser(command);
  }
}
