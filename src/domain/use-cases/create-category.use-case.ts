import { UseCase } from '@/domain/use-case';
import { CategoryModel, CreateCategoryInputModel } from '@/domain/models';
import { CategoryRepository } from '@/data/repositories';


export class CreateCategoryUseCase implements UseCase<CreateCategoryInputModel, CategoryModel> {
  constructor(private categoryRepository: CategoryRepository) {}

  async exec({ name, tax }: CreateCategoryInputModel): Promise<CategoryModel> {
    const category = await this.categoryRepository.create({
      name,
      tax,
    });
    
    return {
      id: category.id,
      name: category.name,
      tax: category.tax,
    };
  }
}
