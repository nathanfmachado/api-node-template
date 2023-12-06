import { prisma } from '@/data/prisma';
import { Prisma } from '@prisma/client';
import { PaginationInput, PrismaProductUpdateInput, ProductRepository } from '@/data/repositories/product.repository';
import { NotFoundError } from '@/core/errors';
import { isUndefined } from 'lodash';

export class ProductPrismaRepository implements ProductRepository {

  async findMany({ limit, offset }: PaginationInput) {
    const products = await prisma.product.findMany({
      take: limit,
      skip: offset,
      include: {
        category: true,
      }
    });
    return products;
  }

  async findById(id: string) {
    const product = await prisma.product.findFirst({
      where: {
        id,
      }
    });
    return product;
  }

  async findByIdWithCategory(id: string) {
    const product = await prisma.product.findFirst({
      where: {
        id,
      },
      include: {
        category: true,
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

  async update({ id, name, price, description }: PrismaProductUpdateInput) {
    const productFound = await prisma.product.findFirst({
      where: {
        id,
      }
    });
    if (!productFound) {
      throw new NotFoundError();
    }
    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name: isUndefined(name) ? productFound.name : name,
        price: isUndefined(price) ? productFound.price : price,
        description: isUndefined(description) ? productFound.description : description,
      }
    });
    return product;
  }

  async delete(id: string) {
    await prisma.product.delete({
      where: {
        id,
      }
    });
  }
}