import { BaseError } from './base-error';
import { ErrorType } from './error.type';

export class InvalidDataError extends BaseError {
  constructor(message?: string) {
    super(ErrorType.InvalidDataError, message ?? 'Invalid input data');
  }
}