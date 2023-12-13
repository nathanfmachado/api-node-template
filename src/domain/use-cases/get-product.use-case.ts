import { UseCase } from '@/domain/use-case';
import { ProductModel } from '@/domain/models';
import { ProductRepository } from '@/data/repositories/product.repository';
import { NotFoundError } from '@/core/errors';
import { ProductMapper } from '@/domain/mappers';


export class GetProductUseCase implements UseCase<string, ProductModel> {
  constructor(private productRepository: ProductRepository, private productMapper: ProductMapper) {}

  async exec(id: string): Promise<ProductModel> {
    const product = await this.productRepository.findByIdWithCategory(id);
    
    if (!product) {
      throw new NotFoundError();
    }
    
    return this.productMapper.map(product);
  }
}
