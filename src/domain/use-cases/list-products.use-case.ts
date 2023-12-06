import { UseCase } from '@/domain/use-case';
import { PaginatedModel, PaginationModel, ProductModel } from '@/domain/models';
import { ProductRepository } from '@/data/repositories/product.repository';


export class ListProductsUseCase implements UseCase<PaginationModel, PaginatedModel<ProductModel>> {
  constructor(private productRepository: ProductRepository) {}

  async exec({ page, limit }: PaginationModel): Promise<PaginatedModel<ProductModel>> {
    const offset = (page - 1) * limit;
    const products = await this.productRepository.findMany({ limit, offset });

    return { 
      page,
      limit,
      items: products.map((product) => this.mapProductToProductModel(product))
    };
  }

  private mapProductToProductModel(product: any): ProductModel {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      category: {
        id: product.category?.id,
        name: product.category?.name,
      }
    };
  }
}