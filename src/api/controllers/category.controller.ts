import { handleError } from '@/core/errors';
import { Request, Response } from 'express';
import { validateRequest, uuidValidator, paginationValidator, createCategoryValidator, updateCategoryValidator } from '@/api/validators';
import { makeCreateCategoryUseCase, makeDeleteCategoryUseCase, makeGetCategoryUseCase, makeListCategoriesUseCase, makeUpdateCategoryUseCase } from '@/domain/factories';

export class CategoryController {
  constructor() {}

  async list(request: Request, response: Response) {
    const listProductsUseCase = makeListCategoriesUseCase();
    
    try {
      const queryParams = validateRequest(request.query, paginationValidator);
      const products = await listProductsUseCase.exec(queryParams);
      return response.status(200).send(products);
    } catch (error) {
      handleError(error, response);
    }
  }

  async create(request: Request, response: Response) {
    const createCategoryUseCase = makeCreateCategoryUseCase();

    try {
      const data = validateRequest(request.body, createCategoryValidator);
      const category = await createCategoryUseCase.exec(data);
      return response.status(201).send(category);
    } catch (error) {
      handleError(error, response);
    }
  }

  async getById(request: Request, response: Response) {
    const getCategoryByIdUseCase = makeGetCategoryUseCase();
    try {
      const { id } = validateRequest(request.params, uuidValidator);
      const category = await getCategoryByIdUseCase.exec(id);
      return response.status(200).send(category);
    } catch (error) {
      handleError(error, response);
    }
  }

  async update(request: Request, response: Response) {
    const updateCategoryUseCase = makeUpdateCategoryUseCase();
    try {
      const { id } = validateRequest(request.params, uuidValidator);
      const data = validateRequest(request.body, updateCategoryValidator);
      const category = await updateCategoryUseCase.exec({ ...data, id });
      return response.status(200).send(category);
    } catch (error) {
      handleError(error, response);
    }
  }

  async delete(request: Request, response: Response) {
    const deleteCategoryUseCase = makeDeleteCategoryUseCase();
    try {
      const { id } = validateRequest(request.params, uuidValidator);
      await deleteCategoryUseCase.exec(id);
      return response.status(200).send();
    } catch (error) {
      handleError(error, response);
    }
  }
}
