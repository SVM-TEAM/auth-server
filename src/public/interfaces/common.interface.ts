export interface HeaderToken {
  accessToken: string;
  refreshToken: string;
}

interface BaseExceptionErrorStateInferface {
  code: number;
  result: {
    error: {
      message: string;
    };
  };
}

export interface ValidateUserInfo {
  userSeq: string;
}

export interface LoginResult {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  failerErrorStatus?: BaseExceptionErrorStateInferface;
}
