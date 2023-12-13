import { UseCase } from '@/domain/use-case';
import { CategoryModel } from '@/domain/models';
import { CategoryRepository } from '@/data/repositories';
import { NotFoundError } from '@/core/errors';
import { CategoryMapper } from '@/domain/mappers';


export class GetCategoryUseCase implements UseCase<string, CategoryModel> {
  constructor(private categoryRepository: CategoryRepository, private categoryMapper: CategoryMapper) {}

  async exec(id: string): Promise<CategoryModel> {
    const category = await this.categoryRepository.findById(id);
    
    if (!category) {
      throw new NotFoundError();
    }
    
    return this.categoryMapper.map(category);
  }
}
