import { ProductInMemoryRepository } from '@/data/repositories/in-memory/product.in-memory-repository';
import { ProductPrismaRepository } from '@/data/repositories/prisma/product.prisma-repository';
import { CalculatePaymentPartsUseCase } from '../use-cases/calculate-payment-parts.use-case';
import { CategoryInMemoryRepository } from '@/data/repositories/in-memory/category.in-memory-repository';


export function makeCalculatePaymentPartsUseCase(inMemory: boolean = false) {
  const productPrismaRepository = inMemory ? new ProductInMemoryRepository(new CategoryInMemoryRepository()) : new ProductPrismaRepository();
  const calculatePaymentPartsUseCase = new CalculatePaymentPartsUseCase(productPrismaRepository);

  return calculatePaymentPartsUseCase;
}