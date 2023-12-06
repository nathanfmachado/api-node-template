import { prisma } from '@/data/prisma';
import { NotFoundError } from '@/core/errors';
import { isUndefined } from 'lodash';
import { CategoryCreateInput, CategoryRepository, CategoryUpdateInput, PaginationInput } from '@/data/repositories';

export class CategoryPrismaRepository implements CategoryRepository {

  async findMany({ limit, offset }: PaginationInput) {
    const categories = await prisma.category.findMany({
      take: limit,
      skip: offset,
    });
    return categories;
  }

  async findById(id: string) {
    const category = await prisma.category.findFirst({
      where: {
        id,
      }
    });
    return category;
  }

  async create({ name, tax }: CategoryCreateInput) {
    const category = await prisma.category.create({
      data: {
        name,
        tax,
      }
    });
    return category;
  }

  async update({ id, name, tax }: CategoryUpdateInput) {
    const categoryFound = await prisma.category.findFirst({
      where: {
        id,
      }
    });
    if (!categoryFound) {
      throw new NotFoundError();
    }
    const category = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name: isUndefined(name) ? categoryFound.name : name,
        tax: isUndefined(tax) ? categoryFound.tax : tax,
      }
    });
    return category;
  }

  async delete(id: string) {
    await prisma.category.delete({
      where: {
        id,
      }
    });
  }
}