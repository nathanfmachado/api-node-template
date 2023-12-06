import { PaginationInput, CategoryRepository, CategoryCreateInput, CategoryUpdateInput  } from '@/data/repositories';
import { NotFoundError } from '@/core/errors';
import { isUndefined } from 'lodash';
import { CategoryEntity } from '@/data/entities';

export class CategoryInMemoryRepository implements CategoryRepository { 
  public categories: CategoryEntity[] = [];

  async findMany({ limit, offset }: PaginationInput) {
    const categories = this.categories.slice(offset, offset + limit);
    return categories;
  }

  async findById(id: string) {
    const category = this.categories.find(category => category.id === id);
    return category ?? null;
  }

  async create({ name, tax }: CategoryCreateInput) {
    const category: CategoryEntity = {
      id: String(this.categories.length + 1),
      name,
      tax: tax ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.categories.push(category);
    return category;
  }

  async update({ id, name, tax }: CategoryUpdateInput) {
    const category = this.categories.find(category => category.id === id);
    if (!category) {
      throw new NotFoundError();
    }
    const updatedCategory = {
      ...category,
      name: isUndefined(name) ? category.name : name ,
      tax: isUndefined(tax) ? category.tax : tax,
      updated_at: new Date(),
    };
    this.categories = this.categories.map(category => category.id === id ? updatedCategory : category);
    return updatedCategory;
  }

  async delete(id: string) {
    this.categories = this.categories.filter(category => category.id !== id);
  }
}