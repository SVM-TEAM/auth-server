import { ApiProperty } from '@nestjs/swagger';
import { RESPONSE_CODES } from '../codes/response.code';

export class BaseResponse<T> {
  @ApiProperty()
  private readonly result: T | T[];

  @ApiProperty()
  private readonly code: number;

  constructor(result: T | T[], code: number) {
    this.result = result;
    this.code = code;
  }

  static success<T>(
    data: T | T[],
    code = RESPONSE_CODES.SUCCESS,
  ): BaseResponse<T> {
    return new BaseResponse<T>(data, code);
  }

  static emptyData(
    data: [] | null,
    code = RESPONSE_CODES.EMPTY_DATA,
  ): BaseResponse<[] | null> {
    return new BaseResponse<[] | null>(data, code);
  }
}
