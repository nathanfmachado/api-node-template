import { UseCase } from '@/domain/use-case';
import { CategoryModel, PaginatedModel, PaginationModel } from '@/domain/models';
import { CategoryRepository } from '@/data/repositories';


export class ListCategoriesUseCase implements UseCase<PaginationModel, PaginatedModel<CategoryModel>> {
  constructor(private categoryRepository: CategoryRepository) {}

  async exec({ page, limit }: PaginationModel): Promise<PaginatedModel<CategoryModel>> {
    const offset = (page - 1) * limit;
    const categories = await this.categoryRepository.findMany({ limit, offset });

    return { 
      page,
      limit,
      items: categories.map((category) => this.mapCategoryToCategoryModel(category))
    };
  }

  private mapCategoryToCategoryModel(category: any): CategoryModel {
    return {
      id: category.id,
      name: category.name,
      tax: category.tax,
    };
  }
}
