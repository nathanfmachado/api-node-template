import { handleError } from '@/core/errors';
import { makeCreateProductUseCase } from '@/domain/factories/make-create-product-use-case';
import { makeGetProductUseCase } from '@/domain/factories/make-get-product-use-case';
import { Request, Response } from 'express';
import { createProductValidator, validateRequest, uuidValidator } from '@/api/validators';


export class ProductController {
  constructor() {}

  async create(request: Request, response: Response) {
    const createProductUseCase = makeCreateProductUseCase();

    try {
      const { name, price, description } = validateRequest(request.body, createProductValidator);
      const product = await createProductUseCase.exec({ name, price, description });
      return response.status(201).send(product);
    } catch (error) {
      handleError(error, response);
    }
  }

  async getById(request: Request, response: Response) {
    const getProductByIdUseCase = makeGetProductUseCase();
    try {
      const { id } = validateRequest(request.params, uuidValidator);
      const product = await getProductByIdUseCase.exec(id);
      return response.status(200).send(product);
    } catch (error) {
      handleError(error, response);
    }
  }
}
