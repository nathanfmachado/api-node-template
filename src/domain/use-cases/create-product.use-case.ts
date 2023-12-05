import { UseCase } from '@/domain/use-case';
import { CreateProductInputModel, ProductModel } from '@/domain/models';
import { ProductPrismaRepository } from '@/data/repositories/product.prisma-repository';


export class CreateProductUseCase implements UseCase<CreateProductInputModel, ProductModel> {
  constructor() {}

  async exec({ name, price, description }: CreateProductInputModel): Promise<ProductModel> {
    const productPrismaRepository = new ProductPrismaRepository();
    const product = await productPrismaRepository.create({
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