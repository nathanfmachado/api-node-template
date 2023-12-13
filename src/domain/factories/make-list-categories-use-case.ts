import { CategoryInMemoryRepository } from '@/data/repositories/in-memory/category.in-memory-repository';
import { CategoryPrismaRepository } from '@/data/repositories/prisma/category.prisma-repository';
import { ListCategoriesUseCase } from '../use-cases/list-categories.use-case';
import { CategoryMapper } from '../mappers';


export function makeListCategoriesUseCase(inMemory: boolean = false) {
  const categoryRepository = inMemory ? new CategoryInMemoryRepository() : new CategoryPrismaRepository();
  const categoryMapper = new CategoryMapper();
  const listCategoriesUseCase = new ListCategoriesUseCase(categoryRepository, categoryMapper);

  return listCategoriesUseCase;
}
