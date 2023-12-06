import { InvalidDataError } from '@/core/errors';
import { z } from 'zod';


export function validateRequest(data: unknown, validator: z.ZodSchema) {
  try {
    return validator.parse(data);
  } catch (error) {
    throw new InvalidDataError();
  }
}