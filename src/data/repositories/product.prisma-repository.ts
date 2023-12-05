import { prisma } from '@/data/prisma';
import { Prisma } from '@prisma/client';

export class ProductPrismaRepository {
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