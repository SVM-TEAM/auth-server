import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HeaderToken } from 'src/public/interfaces/common.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  private createToken(userSeq: string, option?: { expiresIn: string }) {
    const payload = { userSeq };
    return this.jwtService.sign(payload, option);
  }

  authentication(userSeq: string): HeaderToken {
    const accessToken = this.createToken(userSeq);
    const refreshToken = this.createToken(userSeq, { expiresIn: '15d' });
    return { accessToken, refreshToken };
  }
}
