import { UseCase } from '@/domain/use-case';
import { CategoryModel, UpdateCategoryInputModel } from '@/domain/models';
import { CategoryRepository } from '@/data/repositories';


export class UpdateCategoryUseCase implements UseCase<UpdateCategoryInputModel, CategoryModel> {
  constructor(private categoryRepository: CategoryRepository) {}

  async exec({ id, name, tax }: UpdateCategoryInputModel): Promise<CategoryModel> {
    const category = await this.categoryRepository.update({
      id,
      name,
      tax: tax ?? undefined,
    });
    
    return {
      id: category.id,
      name: category.name,
      tax: category.tax,
    };
  }
}
