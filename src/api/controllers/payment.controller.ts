import { handleError } from '@/core/errors';
import { Request, Response } from 'express';
import { calculatePaymentPartsValidator, uuidValidator, validateRequest } from '@/api/validators';
import { makeCalculatePaymentPartsUseCase } from '@/domain/factories';


export class PaymentController {
  constructor() {}

  async calculatePaymentParts(request: Request, response: Response) {
    const calculatePaymentPartsUseCase = makeCalculatePaymentPartsUseCase();

    try {
      const { id } = validateRequest(request.params, uuidValidator);
      const { parts } = validateRequest(request.query, calculatePaymentPartsValidator);
      const result = await calculatePaymentPartsUseCase.exec({ productId: id, parts });
      return response.status(200).send(result);
    } catch (error) {
      handleError(error, response);
    }
  }

}
