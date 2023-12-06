import { Prisma, Product } from '@prisma/client';
import { ProductRepository } from '@/data/repositories/product.repository';

export class ProductInMemoryRepository implements ProductRepository { 
  public products: Product[] = [];

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
}