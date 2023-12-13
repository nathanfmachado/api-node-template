import { CategoryInMemoryRepository } from '@/data/repositories/in-memory/category.in-memory-repository';
import { CategoryPrismaRepository } from '@/data/repositories/prisma/category.prisma-repository';
import { CreateCategoryUseCase } from '../use-cases/create-category.use-case';
import { CategoryMapper } from '../mappers';


export function makeCreateCategoryUseCase(inMemory: boolean = false) {
  const categoryRepository = inMemory ? new CategoryInMemoryRepository() : new CategoryPrismaRepository();
  const categoryMapper = new CategoryMapper();
  const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository, categoryMapper);

  return createCategoryUseCase;
}
