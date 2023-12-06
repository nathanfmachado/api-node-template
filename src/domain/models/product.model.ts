import { CategoryModel } from './category.model';

export interface ProductModel {
  id: string;
  name: string;
  price: number;
  description?: string | null;
  category?: CategoryModel | null;
}

export interface CreateProductInputModel {
  name: string;
  price: number;
  description?: string | null;
  categoryId?: string | null;
}

export interface UpdateProductInputModel {
  id: string;
  name?: string;
  price?: number;
  description?: string | null;
  categoryId?: string | null;
}