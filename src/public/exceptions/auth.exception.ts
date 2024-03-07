import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { ERROR_CODES } from '../codes/error.code';

export class NotReadyEmailAuthentication extends BaseException {
  constructor() {
    super(
      ERROR_CODES.NOT_READY_USER_ID_AUTHENTICATION,
      'NOT_READY_USER_ID_AUTHENTICATION',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
