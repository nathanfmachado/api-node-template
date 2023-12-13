import { ProductEntity } from '@/data/entities';
import { ProductModel } from '@/domain/models';
import { CategoryMapper } from './category.mapper';

export class ProductMapper {
  constructor(private categoryMapper: CategoryMapper) {}

  map(product: ProductEntity): ProductModel {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category ? this.categoryMapper.map(product.category) : null,
    };
  }
}
