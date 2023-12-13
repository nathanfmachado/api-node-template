import { describe, expect, it, beforeEach } from 'vitest';
import { CreateCategoryUseCase } from './create-category.use-case';
import { makeCreateCategoryUseCase } from '@/domain/factories';


describe('Create Category Use Case', () => {
  let createCategoryUseCase: CreateCategoryUseCase;

  beforeEach(() => {
    createCategoryUseCase = makeCreateCategoryUseCase(true);
  });

  it('should create a category', async () => {
    const categoryInput = {
      name: 'category name',
      tax: 0.0125
    };
    const category = await createCategoryUseCase.exec(categoryInput);
    
    expect(category).toMatchObject(categoryInput);
  });
});
