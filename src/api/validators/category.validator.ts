import { z } from 'zod';


export const createCategoryValidator = z.object({
  name: z.string(),
  tax: z.number().positive().nullable().optional()
});

export const updateCategoryValidator = z.object({
  name: z.string().optional(),
  tax: z.number().positive().nullable().optional()
});
