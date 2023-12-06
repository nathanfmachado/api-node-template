import { UseCase } from '@/domain/use-case';
import { ProductModel, UpdateProductInputModel } from '@/domain/models';
import { ProductRepository } from '@/data/repositories/product.repository';


export class UpdateProductUseCase implements UseCase<UpdateProductInputModel, ProductModel> {
  constructor(private productRepository: ProductRepository) {}

  async exec({ id, name, price, description }: UpdateProductInputModel): Promise<ProductModel> {
    const product = await this.productRepository.update({
      id,
      name,
      price,
      description,
    });
    
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
    };
  }
}