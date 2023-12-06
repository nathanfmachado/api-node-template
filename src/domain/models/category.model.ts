export interface CategoryModel {
  id: string;
  name: string;
  tax?: number | null;
}

export interface CreateCategoryInputModel {
  name: string;
  tax?: number | null;
}

export interface UpdateCategoryInputModel {
  id: string;
  name?: string;
  tax?: number | null;
}
