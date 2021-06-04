import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { ApiErrorCode, ApiErrorMap } from './api.code.enum';

export class ApiException extends HttpException {
  public errorCode: ApiErrorCode;
  public errMessage: string;

  constructor(
    errorCode: ApiErrorCode,
    errMessage = '',
    status: HttpStatus = HttpStatus.OK,
  ) {
    super(errMessage, status);
    this.errMessage = errMessage || ApiErrorMap[errorCode];
    this.errorCode = errorCode;
  }

  getErrorCode(): ApiErrorCode {
    return this.errorCode;
  }

  getErrorMessage(): string {
    return this.errMessage;
  }
}
