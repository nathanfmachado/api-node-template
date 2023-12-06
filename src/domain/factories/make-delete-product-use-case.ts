import { ProductPrismaRepository } from '@/data/repositories/prisma/product.prisma-repository';
import { ProductInMemoryRepository } from '@/data/repositories/in-memory/product.in-memory-repository';
import { DeleteProductUseCase } from '../use-cases/delete-product.use-case';


export function makeDeleteProductUseCase(inMemory: boolean = false) {
  const productPrismaRepository = inMemory ? new ProductInMemoryRepository : new ProductPrismaRepository();
  const deleteProductUseCase = new DeleteProductUseCase(productPrismaRepository);

  return deleteProductUseCase;
}
