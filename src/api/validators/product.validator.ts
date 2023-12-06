import { z } from 'zod';


export const createProductValidator = z.object({
  name: z.string(),
  price: z.number().positive(),
  description: z.string().optional(),
});

export const updateProductValidator = z.object({
  id: z.string().uuid(),
  name: z.string().optional(),
  price: z.number().positive().optional(),
  description: z.string().optional(),
});
