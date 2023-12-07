import { z } from 'zod';


export const calculatePaymentPartsValidator = z.object({
  parts: z.coerce.number().int().positive().default(6)
});
