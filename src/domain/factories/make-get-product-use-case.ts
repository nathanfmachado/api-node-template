import { ProductPrismaRepository } from '@/data/repositories/prisma/product.prisma-repository';
import { GetProductUseCase } from '../use-cases/get-product.use-case';
import { ProductInMemoryRepository } from '@/data/repositories/in-memory/product.in-memory-repository';


export function makeGetProductUseCase(inMemory: boolean = false) {
  const productPrismaRepository = inMemory ? new ProductInMemoryRepository : new ProductPrismaRepository();
  const getProductUseCase = new GetProductUseCase(productPrismaRepository);

  return getProductUseCase;
}
