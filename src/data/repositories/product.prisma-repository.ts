import { prisma } from '@/data/prisma';
import { Prisma } from '@prisma/client';
import { ProductRepository } from './product.repository';


export class ProductPrismaRepository implements ProductRepository {
  async create({ name, price, description }: Prisma.ProductCreateInput) {
    const product = await prisma.product.create({
      data: {
        name,
        price,
        description,
      }
    });
    return product;
  }
}