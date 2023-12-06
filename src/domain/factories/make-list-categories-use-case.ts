import { CategoryInMemoryRepository } from '@/data/repositories/in-memory/category.in-memory-repository';
import { CategoryPrismaRepository } from '@/data/repositories/prisma/category.prisma-repository';
import { ListCategoriesUseCase } from '../use-cases/list-categories.use-case';


export function makeListCategoriesUseCase(inMemory: boolean = false) {
  const categoryRepository = inMemory ? new CategoryInMemoryRepository : new CategoryPrismaRepository();
  const listCategoriesUseCase = new ListCategoriesUseCase(categoryRepository);

  return listCategoriesUseCase;
}
