import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignUpCommand } from './sign-up.command';
import { PrismaService } from 'src/public/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@CommandHandler(SignUpCommand)
export class SignUpCommandHandler implements ICommandHandler<SignUpCommand> {
  constructor(private readonly prisma: PrismaService) {}

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
    return this.createUser(command);
  }
}
