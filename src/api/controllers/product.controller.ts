import { makeProductUseCase } from '@/domain/factories/make-product-use-case';
import { Request, Response } from 'express';
import { z } from 'zod';


export class ProductController {
  constructor() {}

  async create(request: Request, response: Response) {
    const createProductInputValidator = z.object({
      name: z.string(),
      price: z.number().positive(),
      description: z.string().optional(),
    });
    const { name, price, description } = createProductInputValidator.parse(request.body);

    const createProductUseCase = makeProductUseCase();
    try {
      const product = await createProductUseCase.exec({ name, price, description });
      return response.status(201).send(product);
    } catch (error) {
      return response.status(500).send(error);
    }
  }
}
