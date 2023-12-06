import { describe, expect, it, beforeEach } from 'vitest';
import { CreateProductUseCase } from './create-product.use-case';
import { makeCreateProductUseCase } from '../factories/make-create-product-use-case';


describe('Create Product', () => {
  let createProductUseCase: CreateProductUseCase;

  beforeEach(() => {
    createProductUseCase = makeCreateProductUseCase(true);
  });

  it('should create a product', async () => {
    const productInput = {
      name: 'product name',
      description: 'product description',
      price: 100.15
    };
    const product = await createProductUseCase.exec(productInput);
    
    expect(product).toMatchObject(productInput);
  });

  it('should not create a product with an existing name', async () => {
    const productInput = {
      name: 'product name',
      description: 'product description',
      price: 100.15
    };
    await createProductUseCase.exec(productInput);

    await expect(createProductUseCase.exec(productInput)).rejects.toThrow('Product already exists');
  });

});
