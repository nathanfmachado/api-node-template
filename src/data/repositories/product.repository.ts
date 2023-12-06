import { Prisma, Product } from '@prisma/client';
import { PaginationInput } from './repository-models';

export interface PrismaProductUpdateInput {
  id: string;
  name?: string;
  price?: number;
  description?: string | null;
  category?: Prisma.CategoryCreateNestedOneWithoutProductsInput | undefined;
}

export interface ProductRepository {
  findById(id: string): Promise<Product | null>;
  findByIdWithCategory(id: string): Promise<Product | null>;
  findByName(name: string): Promise<Product | null>;
  findMany(pagination: PaginationInput): Promise<Product[]>;
  create(data: Prisma.ProductCreateInput): Promise<Product>;
  update(data: PrismaProductUpdateInput): Promise<Product>;
  delete(id: string): Promise<void>;
}
