import { prisma } from '@/data/prisma';
import { PaginationInput, ProductUpdateInput, ProductRepository, ProductCreateInput } from '@/data/repositories';
import { NotFoundError } from '@/core/errors';
import { isUndefined } from 'lodash';
import { ProductEntity } from '@/data/entities';

export class ProductPrismaRepository implements ProductRepository {

  async findMany({ limit, offset }: PaginationInput) {
    const products = await prisma.product.findMany({
      take: limit,
      skip: offset,
      include: {
        category: true,
      }
    });
    return products.map(this.mapProductToProductEntity);
  }

  async findById(id: string) {
    const product = await prisma.product.findFirst({
      where: {
        id,
      }
    });
    return product ? this.mapProductToProductEntity(product) : null;
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
    return product ? this.mapProductToProductEntity(product) : null;
  }

  async findByName(name: string) {
    const product = await prisma.product.findFirst({
      where: {
        name,
      }
    });
    console.log('productByName', product);
    return product ? this.mapProductToProductEntity(product) : null;
  }

  async create({ name, price, description, categoryId }: ProductCreateInput) {
    const product = await prisma.product.create({
      data: {
        name,
        price,
        description,
        category: categoryId ? { connect: { id: categoryId }} : undefined,
      }
    });
    return this.mapProductToProductEntity(product);
  }

  async update({ id, name, price, description, categoryId }: ProductUpdateInput) {
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
        category: categoryId ? { connect: { id: categoryId }} : undefined,
      }
    });
    return this.mapProductToProductEntity(product);
  }

  async delete(id: string) {
    await prisma.product.delete({
      where: {
        id,
      }
    });
  }

  private mapProductToProductEntity(product: any): ProductEntity {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      categoryId: product.categoryId,
      category: product.category,
      createdAt: product.created_at,
      updatedAt: product.updated_at,
    };
  }
}