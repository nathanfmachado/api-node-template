import { z } from 'zod';


export const calculatePaymentPartsValidator = z.object({
  productId: z.string().uuid(),
  parts: z.number().int().positive().default(6)
});
