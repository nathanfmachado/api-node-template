import { ErrorType, StatusCode } from './error.type';


export class BaseError extends Error {
  code: ErrorType | StatusCode;

  constructor(type: ErrorType | StatusCode, message?: string) {
    super(message);

    this.code = type;
    this.name = ErrorType[type];
    this.message = message ?? 'An error has occurred';
  }
}