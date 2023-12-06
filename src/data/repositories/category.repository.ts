import { PaginationInput } from './repository-models';
import { CategoryEntity } from '@/data/entities';

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
  findById(id: string): Promise<CategoryEntity | null>;
  findMany(pagination: PaginationInput): Promise<CategoryEntity[]>;
  create(data: CategoryCreateInput): Promise<CategoryEntity>;
  update(data: CategoryUpdateInput): Promise<CategoryEntity>;
  delete(id: string): Promise<void>;
}
