import { Prisma, Product } from '@prisma/client';

export interface ProductRepository {
  create(data: Prisma.ProductCreateInput): Promise<Product>;
}
