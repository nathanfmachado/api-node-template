import { CategoryRepository } from '@/data/repositories';
import { UseCase } from '@/domain/use-case';


export class DeleteCategoryUseCase implements UseCase<string, void> {
  constructor(private categoryRepository: CategoryRepository) {}

  async exec(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
