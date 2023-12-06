import { Category } from '@prisma/client';
import { PaginationInput } from './repository-models';

export interface CategoryUpdateInput {
  id: string;
  name?: string;
  tax?: number | null;
}

export interface CategoryCreateInput {
  name: string;
  tax?: number | null;
}

export interface CategoryRepository {
  findById(id: string): Promise<Category | null>;
  findMany(pagination: PaginationInput): Promise<Category[]>;
  create(data: CategoryCreateInput): Promise<Category>;
  update(data: CategoryUpdateInput): Promise<Category>;
  delete(id: string): Promise<void>;
}
