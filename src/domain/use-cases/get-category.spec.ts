import { describe, expect, it, beforeEach } from 'vitest';
import { GetCategoryUseCase } from './get-category.use-case';
import { CategoryInMemoryRepository } from '@/data/repositories/in-memory/category.in-memory-repository';
import { NotFoundError } from '@/core/errors';
import { CategoryMapper } from '@/domain/mappers';


describe('Get Category Use Case', () => {
  let categoryRepository: CategoryInMemoryRepository;
  let categoryMapper: CategoryMapper;
  let getCategoryUseCase: GetCategoryUseCase;

  beforeEach(() => {
    categoryRepository = new CategoryInMemoryRepository();
    categoryMapper = new CategoryMapper();
    getCategoryUseCase = new GetCategoryUseCase(categoryRepository, categoryMapper);
  });

  it('should get a existing category by id', async () => {
    const categoryInput = {
      name: 'category name',
      tax: 0.1,
    };
    const createdCategory = await categoryRepository.create(categoryInput);

    const categoryFound = await getCategoryUseCase.exec(createdCategory.id);
    
    expect(categoryFound).toMatchObject(categoryInput);
  });

  it('should throw an error when category not found', async () => {
    const id = 'not-found-id';
    
    await expect(getCategoryUseCase.exec(id)).rejects.toBeInstanceOf(NotFoundError);
  });


});
