export interface PaginationModel {
  page: number;
  limit: number;
}

export interface PaginatedModel<T> {
  page: number;
  limit: number;
  items: T[];
}