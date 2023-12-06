import { PaginationInput, ProductUpdateInput, ProductRepository, ProductCreateInput, CategoryRepository } from '@/data/repositories';
import { NotFoundError } from '@/core/errors';
import { isUndefined } from 'lodash';
import { ProductEntity } from '@/data/entities';

export class ProductInMemoryRepository implements ProductRepository { 
  public products: ProductEntity[] = [];

  constructor(private categoryRepository: CategoryRepository) {}

  async findMany({ limit, offset }: PaginationInput) {
    const products = this.products.slice(offset, offset + limit);
    // TODO: include category
    return products;
  }

  async findById(id: string) {
    const product = this.products.find(product => product.id === id);
    return product ?? null;
  }

  async findByIdWithCategory(id: string) {
    const product = this.products.find(product => product.id === id);
    // TODO: include category
    return product ?? null;
  }

  async findByName(name: string) {
    const product = this.products.find(product => product.name === name);
    return product ?? null;
  }

  async create({ name, price, description, categoryId }: ProductCreateInput) {
    const category = categoryId ? await this.categoryRepository.findById(categoryId) : null;
    const product: ProductEntity = {
      id: String(this.products.length + 1),
      name,
      price,
      description: description ?? null,
      category: category ?? undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.push(product);
    return product;
  }

  async update({ id, name, price, description }: ProductUpdateInput) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      throw new NotFoundError();
    }
    const updatedProduct = {
      ...product,
      name: isUndefined(name) ? product.name : name ,
      price: isUndefined(price) ? product.price : price,
      description: isUndefined(description) ? product.description : description,
      updatedAt: new Date(),
    };
    this.products = this.products.map(product => product.id === id ? updatedProduct : product);
    return updatedProduct;
  }

  async delete(id: string) {
    this.products = this.products.filter(product => product.id !== id);
  }
}
