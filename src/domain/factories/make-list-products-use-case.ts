import { ProductPrismaRepository } from '@/data/repositories/prisma/product.prisma-repository';
import { ProductInMemoryRepository } from '@/data/repositories/in-memory/product.in-memory-repository';
import { ListProductsUseCase } from '../use-cases/list-products.use-case';
import { CategoryInMemoryRepository } from '@/data/repositories/in-memory/category.in-memory-repository';
import { CategoryMapper, ProductMapper } from '../mappers';


export function makeListProductsUseCase(inMemory: boolean = false) {
  const productPrismaRepository = inMemory ? new ProductInMemoryRepository(new CategoryInMemoryRepository()) : new ProductPrismaRepository();
  const productMapper = new ProductMapper(new CategoryMapper());
  const listProductUseCase = new ListProductsUseCase(productPrismaRepository, productMapper);

  return listProductUseCase;
}
