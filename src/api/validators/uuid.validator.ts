import { InvalidDataError } from '@/core/errors';
import { z } from 'zod';


export function validateUuid(data: unknown) {
  const validator = z.object({
    id: z.string().uuid(),
  });

  try {
    return validator.parse(data);
  } catch (error) {
    throw new InvalidDataError();
  }
}