import { UseCase } from '@/domain/use-case';
import { CreateProductInputModel, ProductModel } from '@/domain/models';
import { ProductRepository } from '@/data/repositories/product.repository';
import { AlreadyExistsError } from '@/core/errors';
import { mapProductEntityToProductModel } from '@/domain/mappers';


export class CreateProductUseCase implements UseCase<CreateProductInputModel, ProductModel> {
  constructor(private productRepository: ProductRepository) {}

  async exec({ name, price, description, categoryId }: CreateProductInputModel): Promise<ProductModel> {
    const productAlreadyExists = await this.productRepository.findByName(name);

    if (productAlreadyExists) {
      throw new AlreadyExistsError();
    }

    const product = await this.productRepository.create({
      name,
      price,
      description,
      categoryId,
    });

    return mapProductEntityToProductModel(product);
  }
}
