import { handleError } from '@/core/errors';
import { Request, Response } from 'express';
import { calculatePaymentPartsValidator, validateRequest } from '../validators';
import { makeCalculatePaymentPartsUseCase } from '@/domain/factories/make-calculate-payment-parts-use-case';


export class PaymentController {
  constructor() {}

  async calculatePaymentParts(request: Request, response: Response) {
    const calculatePaymentPartsUseCase = makeCalculatePaymentPartsUseCase();

    try {
      const data = validateRequest(request.body, calculatePaymentPartsValidator);
      const result = await calculatePaymentPartsUseCase.exec(data);
      return response.status(200).send(result);
    } catch (error) {
      handleError(error, response);
    }
  }

}
