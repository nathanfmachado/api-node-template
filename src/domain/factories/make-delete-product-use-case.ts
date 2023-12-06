import { ProductPrismaRepository } from '@/data/repositories/prisma/product.prisma-repository';
import { ProductInMemoryRepository } from '@/data/repositories/in-memory/product.in-memory-repository';
import { DeleteProductUseCase } from '../use-cases/delete-product.use-case';
import { CategoryInMemoryRepository } from '@/data/repositories/in-memory/category.in-memory-repository';


export function makeDeleteProductUseCase(inMemory: boolean = false) {
  const productPrismaRepository = inMemory ? new ProductInMemoryRepository(new CategoryInMemoryRepository()) : new ProductPrismaRepository();
  const deleteProductUseCase = new DeleteProductUseCase(productPrismaRepository);

  return deleteProductUseCase;
}
