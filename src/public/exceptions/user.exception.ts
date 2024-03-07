import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { ERROR_CODES } from '../codes/error.code';

export class InvalidUserException extends BaseException {
  constructor() {
    super(ERROR_CODES.INVALID_USER, 'INVALID_USER', HttpStatus.UNAUTHORIZED);
  }
}

export class DuplicationUserException extends BaseException {
  constructor() {
    super(
      ERROR_CODES.DUPLICATION_USER_ID,
      'DUPLICATION_USER_ID',
      HttpStatus.BAD_REQUEST,
    );
  }
}
