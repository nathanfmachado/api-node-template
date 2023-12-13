import { UseCase } from '@/domain/use-case';
import { CreateProductInputModel, ProductModel } from '@/domain/models';
import { ProductRepository } from '@/data/repositories/product.repository';
import { AlreadyExistsError } from '@/core/errors';
import { ProductMapper } from '@/domain/mappers';


export class CreateProductUseCase implements UseCase<CreateProductInputModel, ProductModel> {
  constructor(private productRepository: ProductRepository, private productMapper: ProductMapper) {}

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

    return this.productMapper.map(product);
  }
}
