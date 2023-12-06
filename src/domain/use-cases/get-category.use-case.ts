import { UseCase } from '@/domain/use-case';
import { CategoryModel } from '@/domain/models';
import { CategoryRepository } from '@/data/repositories';
import { NotFoundError } from '@/core/errors';


export class GetCategoryUseCase implements UseCase<string, CategoryModel> {
  constructor(private categoryRepository: CategoryRepository) {}

  async exec(id: string): Promise<CategoryModel> {
    const category = await this.categoryRepository.findById(id);
    
    if (!category) {
      throw new NotFoundError();
    }
    
    return {
      id: category.id,
      name: category.name,
      tax: category.tax,
    };
  }
}
