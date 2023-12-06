import { describe, expect, it, beforeEach } from 'vitest';
import { ProductInMemoryRepository } from '@/data/repositories/in-memory/product.in-memory-repository';
import { DeleteProductUseCase } from './delete-product.use-case';


describe('Delete Product Use Case', () => {
  let productRepository: ProductInMemoryRepository;
  let deleteProductUseCase: DeleteProductUseCase;

  beforeEach(() => {
    productRepository = new ProductInMemoryRepository();
    deleteProductUseCase = new DeleteProductUseCase(productRepository);
  });

  it('should delete a existing product by id', async () => {
    const productInput = {
      name: 'product name',
      description: 'product description',
      price: 100.15
    };
    const createdProduct = await productRepository.create(productInput);

    await deleteProductUseCase.exec(createdProduct.id);
    
    await expect(productRepository.findById(createdProduct.id)).resolves.toBeNull();
  });

});
