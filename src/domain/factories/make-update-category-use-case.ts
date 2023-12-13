import { CategoryInMemoryRepository } from '@/data/repositories/in-memory/category.in-memory-repository';
import { CategoryPrismaRepository } from '@/data/repositories/prisma/category.prisma-repository';
import { UpdateCategoryUseCase } from '../use-cases/update-category.use-case';
import { CategoryMapper, ProductMapper } from '../mappers';


export function makeUpdateCategoryUseCase(inMemory: boolean = false) {
  const categoryRepository = inMemory ? new CategoryInMemoryRepository() : new CategoryPrismaRepository();
  const productMapper = new ProductMapper(new CategoryMapper());
  const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository, productMapper);

  return updateCategoryUseCase;
}
