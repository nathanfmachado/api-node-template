import { z } from 'zod';


export const createProductValidator = z.object({
  name: z.string(),
  price: z.number().positive(),
  description: z.string().nullable().optional(),
  categoryId: z.string().nullable().optional(),
});

export const updateProductValidator = z.object({
  name: z.string().optional(),
  price: z.number().positive().optional(),
  description: z.string().nullable().optional(),
  categoryId: z.string().nullable().optional(),
});
