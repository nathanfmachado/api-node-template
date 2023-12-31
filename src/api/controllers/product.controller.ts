import { handleError } from '@/core/errors';
import { Request, Response } from 'express';
import { createProductValidator, validateRequest, uuidValidator, updateProductValidator, paginationValidator } from '@/api/validators';
import { makeCreateProductUseCase, makeDeleteProductUseCase, makeGetProductUseCase, makeListProductsUseCase, makeUpdateProductUseCase } from '@/domain/factories';


export class ProductController {
  constructor() {}

  async list(request: Request, response: Response) {
    const listProductsUseCase = makeListProductsUseCase();
    
    try {
      const queryParams = validateRequest(request.query, paginationValidator);
      const products = await listProductsUseCase.exec(queryParams);
      return response.status(200).send(products);
    } catch (error) {
      handleError(error, response);
    }
  }

  async create(request: Request, response: Response) {
    const createProductUseCase = makeCreateProductUseCase();

    try {
      const data = validateRequest(request.body, createProductValidator);
      const product = await createProductUseCase.exec(data);
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

  async update(request: Request, response: Response) {
    const updateProductUseCase = makeUpdateProductUseCase();
    try {
      const { id } = validateRequest(request.params, uuidValidator);
      const data = validateRequest(request.body, updateProductValidator);
      const product = await updateProductUseCase.exec({ ...data, id });
      return response.status(200).send(product);
    } catch (error) {
      handleError(error, response);
    }
  }

  async delete(request: Request, response: Response) {
    const deleteProductUseCase = makeDeleteProductUseCase();
    try {
      const { id } = validateRequest(request.params, uuidValidator);
      await deleteProductUseCase.exec(id);
      return response.status(200).send();
    } catch (error) {
      handleError(error, response);
    }
  }
}
