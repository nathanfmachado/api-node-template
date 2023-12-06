import { describe, expect, it, beforeEach } from 'vitest';
import { AlreadyExistsError } from '@/core/errors';
import { ProductInMemoryRepository } from '@/data/repositories/in-memory/product.in-memory-repository';
import { UpdateProductUseCase } from './update-product.use-case';


describe('Update Product Use Case', () => {
  let productRepository: ProductInMemoryRepository;
  let updateProductUseCase: UpdateProductUseCase;

  beforeEach(() => {
    productRepository = new ProductInMemoryRepository();
    updateProductUseCase = new UpdateProductUseCase(productRepository);
  });

  it('should update a product', async () => {
    const productInput = {
      name: 'product name',
      description: 'product description',
      price: 100.15
    };
    const product = await productRepository.create(productInput);

    const updatedProduct = await updateProductUseCase.exec({
      id: product.id,
      name: 'new product name',
      description: 'new product description',
      price: 200.30
    });

    expect(updatedProduct).toMatchObject({
      id: product.id,
      name: 'new product name',
      description: 'new product description',
      price: 200.30
    });
  });

  it('should not update a product with an existing name', async () => {
    const productInput1 = {
      name: 'product name',
      description: 'product description',
      price: 100.15
    };
    const product1 = await productRepository.create(productInput1);
    const productInput2 = {
      name: 'secondary name',
      description: 'product description',
      price: 150
    };
    const product2 = await productRepository.create(productInput2);

    await expect(updateProductUseCase.exec({
      id: product1.id,
      name: product2.name,
      description: 'new product description',
      price: 205
    })).rejects.toBeInstanceOf(AlreadyExistsError);
  });

  it('should update only the price of a product', async () => {
    const productInput = {
      name: 'product name',
      description: 'product description',
      price: 100.15
    };
    const product = await productRepository.create(productInput);

    const updatedProduct = await updateProductUseCase.exec({
      id: product.id,
      price: 250
    });

    expect(updatedProduct).toMatchObject({
      id: product.id,
      name: product.name,
      description: product.description,
      price: 250
    });
  });
});
