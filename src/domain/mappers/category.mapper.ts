import { CategoryEntity } from '@/data/entities';
import { CategoryModel } from '@/domain/models';

export class CategoryMapper {
  map(category: CategoryEntity): CategoryModel {
    return {
      id: category.id,
      name: category.name,
      tax: category.tax,
    };
  }
}
