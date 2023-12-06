import { BaseError } from './base-error';
import { ErrorType } from './error.type';

export class NotFoundError extends BaseError {
  constructor(message?: string) {
    super(ErrorType.NotFoundError, message ?? 'Resource not found');
  }
}