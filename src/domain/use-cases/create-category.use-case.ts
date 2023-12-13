import { UseCase } from '@/domain/use-case';
import { CategoryModel, CreateCategoryInputModel } from '@/domain/models';
import { CategoryRepository } from '@/data/repositories';
import { CategoryMapper } from '@/domain/mappers';


export class CreateCategoryUseCase implements UseCase<CreateCategoryInputModel, CategoryModel> {
  constructor(private categoryRepository: CategoryRepository, private categoryMapper: CategoryMapper) {}

  async exec({ name, tax }: CreateCategoryInputModel): Promise<CategoryModel> {
    const category = await this.categoryRepository.create({
      name,
      tax,
    });
    
    return this.categoryMapper.map(category);
  }
}
