import { ProductRepository } from '@/data/repositories/product.repository';
import { UseCase } from '@/domain/use-case';


export class DeleteProductUseCase implements UseCase<string, void> {
  constructor(private productRepository: ProductRepository) {}

  async exec(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
