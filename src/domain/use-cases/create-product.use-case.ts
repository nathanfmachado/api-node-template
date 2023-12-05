import { UseCase } from '@/domain/use-case';
import { CreateProductInputModel, ProductModel } from '@/domain/models';
import { prisma } from '@/data';


export class CreateProductUseCase implements UseCase<CreateProductInputModel, ProductModel> {
  constructor() {}

  async exec({ name, price, description }: CreateProductInputModel): Promise<ProductModel> {
    const product = await prisma.product.create({
      data: {
        name,
        price,
        description
      },
    });
    
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
    };
  }
}