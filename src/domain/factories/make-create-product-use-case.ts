import { CategoryInMemoryRepository } from '@/data/repositories/in-memory/category.in-memory-repository';
import { ProductInMemoryRepository } from '@/data/repositories/in-memory/product.in-memory-repository';
import { ProductPrismaRepository } from '@/data/repositories/prisma/product.prisma-repository';
import { CreateProductUseCase } from '@/domain/use-cases/create-product.use-case';
import { CategoryMapper, ProductMapper } from '../mappers';


export function makeCreateProductUseCase(inMemory: boolean = false) {
  const productPrismaRepository = inMemory ? new ProductInMemoryRepository(new CategoryInMemoryRepository()) : new ProductPrismaRepository();
  const productMapper = new ProductMapper(new CategoryMapper());
  const createProductUseCase = new CreateProductUseCase(productPrismaRepository, productMapper);

  return createProductUseCase;
}