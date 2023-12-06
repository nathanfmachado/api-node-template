export interface ProductModel {
  id: string;
  name: string;
  price: number;
  description?: string | null;
}

export interface CreateProductInputModel {
  name: string;
  price: number;
  description?: string | null;
}

export interface UpdateProductInputModel {
  id: string;
  name?: string;
  price?: number;
  description?: string | null;
}