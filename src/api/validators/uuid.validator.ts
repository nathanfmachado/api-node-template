import { z } from 'zod';


export const uuidValidator = z.object({
  id: z.string().uuid(),
});
