import { handleError } from '@/core/errors';
import { makeCreateProductUseCase } from '@/domain/factories/make-create-product-use-case';
import { makeGetProductUseCase } from '@/domain/factories/make-get-product-use-case';
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

    const createProductUseCase = makeCreateProductUseCase();
    try {
      const product = await createProductUseCase.exec({ name, price, description });
      return response.status(201).send(product);
    } catch (error) {
      handleError(error, response);
    }
  }

  async getById(request: Request, response: Response) {
    const getProductByIdInputValidator = z.object({
      id: z.string().uuid(),
    });
    const { id } = getProductByIdInputValidator.parse(request.params);

    const getProductByIdUseCase = makeGetProductUseCase();
    try {
      const product = await getProductByIdUseCase.exec(id);
      return response.status(200).send(product);
    } catch (error) {
      handleError(error, response);
    }
  }
}
