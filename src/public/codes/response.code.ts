type ResponseCodeType = 'SUCCESS' | 'EMPTY_DATA';

export const RESPONSE_CODES: { [key in ResponseCodeType]: number } = {
  SUCCESS: 1000,
  EMPTY_DATA: 1001,
};
