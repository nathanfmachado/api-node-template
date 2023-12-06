import { prisma } from '@/data/prisma';
import { Prisma } from '@prisma/client';
import { ProductRepository } from '@/data/repositories/product.repository';


export class ProductPrismaRepository implements ProductRepository {

  async findById(id: string) {
    const product = await prisma.product.findFirst({
      where: {
        id,
      }
    });
    return product;
  }

  async findByName(name: string) {
    const product = await prisma.product.findFirst({
      where: {
        name,
      }
    });
    return product;
  }

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