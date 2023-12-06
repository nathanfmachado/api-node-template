import { describe, expect, it, beforeEach } from 'vitest';
import { CreateCategoryUseCase } from './create-category.use-case';
import { CategoryRepository } from '@/data/repositories';
import { CategoryInMemoryRepository } from '@/data/repositories/in-memory/category.in-memory-repository';


describe('Create Category Use Case', () => {
  let categoryRepository: CategoryRepository;
  let createCategoryUseCase: CreateCategoryUseCase;

  beforeEach(() => {
    categoryRepository = new CategoryInMemoryRepository();
    createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
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
