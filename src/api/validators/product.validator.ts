import { InvalidDataError } from '@/core/errors';
import { z } from 'zod';


export function validateCreateProductInput(data: unknown) {
  const validator = z.object({
    name: z.string(),
    price: z.number().positive(),
    description: z.string().optional(),
  });

  try {
    return validator.parse(data);
  } catch (error) {
    throw new InvalidDataError();
  }
}