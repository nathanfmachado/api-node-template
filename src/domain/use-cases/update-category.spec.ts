import { describe, expect, it, beforeEach } from 'vitest';
import { CategoryRepository } from '@/data/repositories';
import { CategoryInMemoryRepository } from '@/data/repositories/in-memory/category.in-memory-repository';
import { UpdateCategoryUseCase } from './update-category.use-case';
import { CategoryMapper } from '@/domain/mappers';


describe('Update Category Use Case', () => {
  let categoryRepository: CategoryRepository;
  let categoryMapper: CategoryMapper;
  let updateCategoryUseCase: UpdateCategoryUseCase;

  beforeEach(() => {
    categoryRepository = new CategoryInMemoryRepository();
    categoryMapper = new CategoryMapper();
    updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository, categoryMapper);
  });

  it('should update a category', async () => {
    const categoryInput = {
      name: 'category name',
      tax: 0.0125
    };
    const category = await categoryRepository.create(categoryInput);
    const updatedCategory = await updateCategoryUseCase.exec({
      id: category.id,
      name: 'updated category name',
      tax: 0.025
    });
    
    expect(updatedCategory).toMatchObject({
      id: category.id,
      name: 'updated category name',
      tax: 0.025
    });
  });

});
