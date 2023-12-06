import { UseCase } from '@/domain/use-case';
import { ProductModel, UpdateProductInputModel } from '@/domain/models';
import { ProductRepository } from '@/data/repositories/product.repository';
import { AlreadyExistsError } from '@/core/errors';


export class UpdateProductUseCase implements UseCase<UpdateProductInputModel, ProductModel> {
  constructor(private productRepository: ProductRepository) {}

  async exec({ id, name, price, description, categoryId }: UpdateProductInputModel): Promise<ProductModel> {
    if (name) {
      const productNameAlreadyExists = await this.productRepository.findByName(name);
      if (productNameAlreadyExists && productNameAlreadyExists.id !== id) {
        throw new AlreadyExistsError('Product name already exists');
      }
    }

    const product = await this.productRepository.update({
      id,
      name,
      price,
      description,
      category: categoryId ? { connect: { id: categoryId }} : undefined,
    });
    
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
    };
  }
}