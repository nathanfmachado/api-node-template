import { CategoryInMemoryRepository } from '@/data/repositories/in-memory/category.in-memory-repository';
import { CategoryPrismaRepository } from '@/data/repositories/prisma/category.prisma-repository';
import { DeleteCategoryUseCase } from '../use-cases/delete-category.use-case';


export function makeDeleteCategoryUseCase(inMemory: boolean = false) {
  const categoryRepository = inMemory ? new CategoryInMemoryRepository : new CategoryPrismaRepository();
  const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);

  return deleteCategoryUseCase;
}
