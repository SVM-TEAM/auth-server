type CommonErrorCodeType = 'BAD_REQUEST' | 'NETWORK_ERROR';
type UserErrorCodeType = 'DUPLICATION_USER_ID' | 'INVALID_USER';
type AuthErrorCodeType = 'NOT_READY_USER_ID_AUTHENTICATION';

type ErrorCodeType =
  | CommonErrorCodeType
  | UserErrorCodeType
  | AuthErrorCodeType;

export const ERROR_CODES: { [key in ErrorCodeType]: number } = {
  BAD_REQUEST: 2000,
  NETWORK_ERROR: 5000,

  DUPLICATION_USER_ID: 3000,
  INVALID_USER: 3001,
  NOT_READY_USER_ID_AUTHENTICATION: 3002,
};
