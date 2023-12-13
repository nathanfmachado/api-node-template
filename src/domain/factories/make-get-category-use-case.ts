import { CategoryInMemoryRepository } from '@/data/repositories/in-memory/category.in-memory-repository';
import { CategoryPrismaRepository } from '@/data/repositories/prisma/category.prisma-repository';
import { GetCategoryUseCase } from '../use-cases/get-category.use-case';
import { CategoryMapper } from '../mappers';


export function makeGetCategoryUseCase(inMemory: boolean = false) {
  const categoryRepository = inMemory ? new CategoryInMemoryRepository() : new CategoryPrismaRepository();
  const categoryMapper = new CategoryMapper();
  const getCategoryUseCase = new GetCategoryUseCase(categoryRepository, categoryMapper);

  return getCategoryUseCase;
}
