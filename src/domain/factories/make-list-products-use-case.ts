import { ProductPrismaRepository } from '@/data/repositories/prisma/product.prisma-repository';
import { ProductInMemoryRepository } from '@/data/repositories/in-memory/product.in-memory-repository';
import { ListProductsUseCase } from '../use-cases/list-products.use-case';


export function makeListProductsUseCase(inMemory: boolean = false) {
  const productPrismaRepository = inMemory ? new ProductInMemoryRepository : new ProductPrismaRepository();
  const listProductUseCase = new ListProductsUseCase(productPrismaRepository);

  return listProductUseCase;
}
