import { UseCase } from '@/domain/use-case';
import { CategoryModel, PaginatedModel, PaginationModel } from '@/domain/models';
import { CategoryRepository } from '@/data/repositories';
import { CategoryMapper } from '@/domain/mappers';


export class ListCategoriesUseCase implements UseCase<PaginationModel, PaginatedModel<CategoryModel>> {
  constructor(private categoryRepository: CategoryRepository, private categoryMapper: CategoryMapper) {}

  async exec({ page, limit }: PaginationModel): Promise<PaginatedModel<CategoryModel>> {
    const offset = (page - 1) * limit;
    const categories = await this.categoryRepository.findMany({ limit, offset });

    return { 
      page,
      limit,
      items: categories.map(this.categoryMapper.map),
    };
  }
}
