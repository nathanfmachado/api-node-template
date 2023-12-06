import { BaseError } from './base-error';
import { ErrorType } from './error.type';

export class AlreadyExistsError extends BaseError {
  constructor(message?: string) {
    super(ErrorType.AlreadyExists, message ?? 'Resource already exists');
  }
}