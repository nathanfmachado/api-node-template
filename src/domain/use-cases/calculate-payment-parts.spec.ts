import { describe, expect, it, beforeEach } from 'vitest';
import { CalculatePaymentPartsUseCase } from './calculate-payment-parts.use-case';
import { PaymentPartsInputModel } from '../models';
import { ProductInMemoryRepository } from '@/data/repositories/in-memory/product.in-memory-repository';
import { CategoryInMemoryRepository } from '@/data/repositories/in-memory/category.in-memory-repository';


describe('Calculate Payment Parts Use Case', () => {
  let productRepository: ProductInMemoryRepository;
  let categoryRepository: CategoryInMemoryRepository;
  let calculatePaymentPartsUseCase: CalculatePaymentPartsUseCase;

  beforeEach(() => {
    categoryRepository = new CategoryInMemoryRepository();
    productRepository = new ProductInMemoryRepository(categoryRepository);
    calculatePaymentPartsUseCase = new CalculatePaymentPartsUseCase(productRepository);
  });

  it('should calculate payment parts from a product with category', async () => {
    const categoryInput = {
      name: 'category name',
      tax: 0.10
    };
    const category = await categoryRepository.create(categoryInput);
    const productInput = {
      name: 'product name',
      description: 'product description',
      price: 1000,
      categoryId: category.id
    };
    const product = await productRepository.create(productInput);


    const input: PaymentPartsInputModel = {
      productId: product.id,
      parts: 10
    };
    const result = await calculatePaymentPartsUseCase.exec(input);

    console.log(result);
    expect(result.parts).toBe(10);
    expect(result.totalAmount).toBe(1627.50);
    expect(result.partAmount).toBe(162.75);
  }); 

});
