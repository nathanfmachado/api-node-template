import { describe, expect, it, beforeEach } from 'vitest';
import { ProductInMemoryRepository } from '@/data/repositories/in-memory/product.in-memory-repository';
import { ListProductsUseCase } from './list-products.use-case';
import { CategoryInMemoryRepository } from '@/data/repositories/in-memory/category.in-memory-repository';
import { CategoryMapper, ProductMapper } from '@/domain/mappers';


describe('List Products Use Case', () => {
  let categoryRepository: CategoryInMemoryRepository;
  let productRepository: ProductInMemoryRepository;
  let productMapper: ProductMapper;
  let listProductsUseCase: ListProductsUseCase;

  beforeEach(() => {
    categoryRepository = new CategoryInMemoryRepository();
    productRepository = new ProductInMemoryRepository(categoryRepository);
    productMapper = new ProductMapper(new CategoryMapper());
    listProductsUseCase = new ListProductsUseCase(productRepository, productMapper);
  });

  it('should list products', async () => {
    const productInput = [{
      name: 'product 1',
      description: 'product description 1',
      price: 85
    },
    {
      name: 'product 2',
      description: 'product description 2',
      price: 10943.20
    },
    {
      name: 'product 3',
      price: 520
    }];
    Promise.all(productInput.map(async (product) => await productRepository.create(product)));

    const products = await listProductsUseCase.exec({ page: 1, limit: 10 });
  
    expect(products.page).toBe(1);
    expect(products.limit).toBe(10);
    expect(products.items).toMatchObject(productInput);
  });

  it('should not list products if page does not exists', async () => {
    const productInput = [{
      name: 'product 1',
      description: 'product description 1',
      price: 85
    },
    {
      name: 'product 2',
      description: 'product description 2',
      price: 10943.20
    },
    {
      name: 'product 3',
      price: 520
    }];
    Promise.all(productInput.map(async (product) => await productRepository.create(product)));

    const products = await listProductsUseCase.exec({ page: 3, limit: 10 });
  
    expect(products.page).toBe(3);
    expect(products.limit).toBe(10);
    expect(products.items).toMatchObject([]);
  });

});
