import { Response } from 'express';
import { BaseError } from './base-error';

export function handleError(error: unknown, response: Response) {
  if (error instanceof BaseError) {
    return response.status(error.code).send({ message: error.message, code: error.code, name: error.name });
  }
  return response.status(500).send(error);
}