import { UseCase } from '@/domain/use-case';
import { CategoryModel, UpdateCategoryInputModel } from '@/domain/models';
import { CategoryRepository } from '@/data/repositories';
import { CategoryMapper } from '@/domain/mappers';


export class UpdateCategoryUseCase implements UseCase<UpdateCategoryInputModel, CategoryModel> {
  constructor(private categoryRepository: CategoryRepository, private categoryMapper: CategoryMapper) {}

  async exec({ id, name, tax }: UpdateCategoryInputModel): Promise<CategoryModel> {
    const category = await this.categoryRepository.update({
      id,
      name,
      tax: tax ?? undefined,
    });
    
    return this.categoryMapper.map(category);
  }
}
