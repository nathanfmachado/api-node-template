import { PaginationInput } from './repository-models';
import { ProductEntity } from '@/data/entities';

export interface ProductCreateInput {
  name: string;
  price: number;
  description?: string | null;
  categoryId?: string | null;
}

export interface ProductUpdateInput {
  id: string;
  name?: string;
  price?: number;
  description?: string | null;
  categoryId?: string | null;
}

export interface ProductRepository {
  findById(id: string): Promise<ProductEntity | null>;
  findByIdWithCategory(id: string): Promise<ProductEntity | null>;
  findByName(name: string): Promise<ProductEntity | null>;
  findMany(pagination: PaginationInput): Promise<ProductEntity[]>;
  create(data: ProductCreateInput): Promise<ProductEntity>;
  update(data: ProductUpdateInput): Promise<ProductEntity>;
  delete(id: string): Promise<void>;
}
