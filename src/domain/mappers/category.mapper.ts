import { CategoryEntity } from '@/data/entities';
import { CategoryModel } from '@/domain/models';

export function mapCategoryEntityToCategoryModel(category: CategoryEntity): CategoryModel {
  return {
    id: category.id,
    name: category.name,
    tax: category.tax,
  };
}
