import { ProductPrismaRepository } from '@/data/repositories/prisma/product.prisma-repository';
import { GetProductUseCase } from '../use-cases/get-product.use-case';
import { ProductInMemoryRepository } from '@/data/repositories/in-memory/product.in-memory-repository';
import { CategoryInMemoryRepository } from '@/data/repositories/in-memory/category.in-memory-repository';
import { CategoryMapper, ProductMapper } from '../mappers';


export function makeGetProductUseCase(inMemory: boolean = false) {
  const productPrismaRepository = inMemory ? new ProductInMemoryRepository(new CategoryInMemoryRepository()) : new ProductPrismaRepository();
  const productMapper = new ProductMapper(new CategoryMapper());
  const getProductUseCase = new GetProductUseCase(productPrismaRepository, productMapper);

  return getProductUseCase;
}
