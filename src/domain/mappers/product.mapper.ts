import { ProductEntity } from '@/data/entities';
import { ProductModel } from '@/domain/models';
import { mapCategoryEntityToCategoryModel } from './category.mapper';

export function mapProductEntityToProductModel(product: ProductEntity): ProductModel {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    category: product.category ? mapCategoryEntityToCategoryModel(product.category) : null,
  };
}
