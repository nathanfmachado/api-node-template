import { ProductPrismaRepository } from '@/data/repositories/product.prisma-repository';
import { CreateProductUseCase } from '@/domain/use-cases/create-product.use-case';
import { Request, Response } from 'express';
import { z } from 'zod';


export class ProductController {
  constructor() {}

  async create(request: Request, response: Response) {
    const createProductInputValidator = z.object({
      name: z.string(),
      price: z.number().positive(),
      description: z.string().optional(),
    });
    const { name, price, description } = createProductInputValidator.parse(request.body);

    const productPrismaRepository = new ProductPrismaRepository();
    const createProductUseCase = new CreateProductUseCase(productPrismaRepository);
    try {
      const product = await createProductUseCase.exec({ name, price, description });
      return response.status(201).send(product);
    } catch (error) {
      return response.status(500).send(error);
    }
  }
}
