import { describe, expect, it, beforeEach } from 'vitest';
import { CategoryInMemoryRepository } from '@/data/repositories/in-memory/category.in-memory-repository';
import { DeleteCategoryUseCase } from './delete-category.use-case';


describe('Delete Category Use Case', () => {
  let categoryRepository: CategoryInMemoryRepository;
  let deleteCategoryUseCase: DeleteCategoryUseCase;

  beforeEach(() => {
    categoryRepository = new CategoryInMemoryRepository();
    deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);
  });


  it('should delete a existing category by id', async () => {
    const categoryInput = {
      name: 'category name',
      tax: 0.5,
    };
    const createdCategory = await categoryRepository.create(categoryInput);

    await deleteCategoryUseCase.exec(createdCategory.id);
    
    await expect(categoryRepository.findById(createdCategory.id)).resolves.toBeNull();
  });

});
