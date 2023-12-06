import { Prisma, Product } from '@prisma/client';

export interface ProductRepository {
  findByName(name: string): Promise<Product | null>;
  create(data: Prisma.ProductCreateInput): Promise<Product>;
}
