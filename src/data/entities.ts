export interface ProductEntity {
  id: string;
  name: string;
  price: number;
  description?: string | null;

  categoryId?: string;
  category?: CategoryEntity;

  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryEntity {
  id: string;
  name: string;
  tax?: number | null;

  products?: ProductEntity[];

  createdAt: Date;
  updatedAt: Date;
}
