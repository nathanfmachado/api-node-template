import { CategoryInMemoryRepository } from '@/data/repositories/in-memory/category.in-memory-repository';
import { ProductInMemoryRepository } from '@/data/repositories/in-memory/product.in-memory-repository';
import { ProductPrismaRepository } from '@/data/repositories/prisma/product.prisma-repository';
import { UpdateProductUseCase } from '@/domain/use-cases/update-product.use-case';


export function makeUpdateProductUseCase(inMemory: boolean = false) {
  const productPrismaRepository = inMemory ? new ProductInMemoryRepository(new CategoryInMemoryRepository()) : new ProductPrismaRepository();
  const updateProductUseCase = new UpdateProductUseCase(productPrismaRepository);

  return updateProductUseCase;
}