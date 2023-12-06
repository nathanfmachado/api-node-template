import { ProductInMemoryRepository } from '@/data/repositories/in-memory/product.in-memory-repository';
import { ProductPrismaRepository } from '@/data/repositories/prisma/product.prisma-repository';
import { CreateProductUseCase } from '@/domain/use-cases/create-product.use-case';


export function makeCreateProductUseCase(inMemory: boolean = false) {
  const productPrismaRepository = inMemory ? new ProductInMemoryRepository : new ProductPrismaRepository();
  const createProductUseCase = new CreateProductUseCase(productPrismaRepository);

  return createProductUseCase;
}