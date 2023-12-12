import { describe, expect, it, beforeEach } from 'vitest';
import { GetProductUseCase } from './get-product.use-case';
import { ProductInMemoryRepository } from '@/data/repositories/in-memory/product.in-memory-repository';
import { NotFoundError } from '@/core/errors';
import { CategoryInMemoryRepository } from '@/data/repositories/in-memory/category.in-memory-repository';


describe('Get Product Use Case', () => {
  let categoryRepository: CategoryInMemoryRepository;
  let productRepository: ProductInMemoryRepository;
  let getProductUseCase: GetProductUseCase;

  beforeEach(() => {
    categoryRepository = new CategoryInMemoryRepository();
    productRepository = new ProductInMemoryRepository(categoryRepository);
    getProductUseCase = new GetProductUseCase(productRepository);
  });

  it('should get a existing product by id', async () => {
    const productInput = {
      name: 'product name',
      description: 'product description',
      price: 100.15
    };
    const createdProduct = await productRepository.create(productInput);

    const productFound = await getProductUseCase.exec(createdProduct.id);
    
    expect(productFound).toMatchObject(productInput);
  });

  it('should not get a non-existing product by id', async () => {
    const productInput = {
      name: 'product name',
      description: 'product description',
      price: 100.15
    };
    await productRepository.create(productInput);

    await expect(getProductUseCase.exec('non-existing-id')).rejects.toBeInstanceOf(NotFoundError);
  });

});
