import { Prisma, Product } from '@prisma/client';
import { PrismaProductUpdateInput, ProductRepository } from '@/data/repositories/product.repository';
import { NotFoundError } from '@/core/errors';
import { isUndefined } from 'lodash';

export class ProductInMemoryRepository implements ProductRepository { 
  public products: Product[] = [];

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

  async create({ name, price, description }: Prisma.ProductCreateInput) {
    const product = {
      id: String(this.products.length + 1),
      name,
      price,
      description: description ?? null,
      category_id: null,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.products.push(product);
    return product;
  }

  async update({ id, name, price, description }: PrismaProductUpdateInput) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      throw new NotFoundError();
    }
    const updatedProduct = {
      ...product,
      name: isUndefined(name) ? product.name : name ,
      price: isUndefined(price) ? product.price : price,
      description: isUndefined(description) ? product.description : description,
      updated_at: new Date(),
    };
    this.products = this.products.map(product => product.id === id ? updatedProduct : product);
    return updatedProduct;
  }
}