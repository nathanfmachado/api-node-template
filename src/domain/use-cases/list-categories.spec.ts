import { describe, expect, it, beforeEach } from 'vitest';
import { CategoryRepository } from '@/data/repositories';
import { CategoryInMemoryRepository } from '@/data/repositories/in-memory/category.in-memory-repository';
import { ListCategoriesUseCase } from './list-categories.use-case';


describe('List Categories Use Case', () => {
  let categoryRepository: CategoryRepository;
  let listCategoryUseCase: ListCategoriesUseCase;

  beforeEach(() => {
    categoryRepository = new CategoryInMemoryRepository();
    listCategoryUseCase = new ListCategoriesUseCase(categoryRepository);
  });

  it('should list categories', async () => {
    const categoryInput = [{
      name: 'category name 1',
      tax: 0.125
    },
    {
      name: 'category name 2',
      tax: 0.05
    },
    {
      name: 'category name 3'
    }];
    Promise.all(categoryInput.map(async (category) => await categoryRepository.create(category)));

    const result = await listCategoryUseCase.exec({ page: 1, limit: 10 });
    
    expect(result.page).toBe(1);
    expect(result.limit).toBe(10);
    expect(result.items).toMatchObject(categoryInput);
  });

  it('should not list categories if page does not exists', async () => {
    const categoryInput = [{
      name: 'category name 1',
      tax: 0.125
    },
    {
      name: 'category name 2',
      tax: 0.05
    },
    {
      name: 'category name 3'
    }];
    Promise.all(categoryInput.map(async (category) => await categoryRepository.create(category)));

    const result = await listCategoryUseCase.exec({ page: 3, limit: 10 });
  
    expect(result.page).toBe(3);
    expect(result.limit).toBe(10);
    expect(result.items).toMatchObject([]);
  });
  
});
