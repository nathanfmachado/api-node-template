import { ProductPrismaRepository } from '@/data/repositories/prisma/product.prisma-repository';
import { CreateProductUseCase } from '@/domain/use-cases/create-product.use-case';


export function makeProductUseCase() {
  const productPrismaRepository = new ProductPrismaRepository();
  const createProductUseCase = new CreateProductUseCase(productPrismaRepository);

  return createProductUseCase;
}