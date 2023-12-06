import { UseCase } from '@/domain/use-case';
import { CreateProductInputModel, ProductModel } from '@/domain/models';
import { ProductRepository } from '@/data/repositories/product.repository';
import { AlreadyExistsError } from '@/core/errors';


export class CreateProductUseCase implements UseCase<CreateProductInputModel, ProductModel> {
  constructor(private productRepository: ProductRepository) {}

  async exec({ name, price, description }: CreateProductInputModel): Promise<ProductModel> {
    const productAlreadyExists = await this.productRepository.findByName(name);

    if (productAlreadyExists) {
      throw new AlreadyExistsError();
    }

    const product = await this.productRepository.create({
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