import { UseCase } from '@/domain/use-case';
import { ProductModel } from '@/domain/models';
import { ProductRepository } from '@/data/repositories/product.repository';


export class GetProductUseCase implements UseCase<string, ProductModel> {
  constructor(private productRepository: ProductRepository) {}

  async exec(id: string): Promise<ProductModel> {
    const product = await this.productRepository.findById(id);
    
    if (!product) {
      throw new Error('Product not found');
    }
    
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
    };
  }
}