import { Injectable } from '@nestjs/common';
import { ICategoriesResponse } from './model/category.model';
import { categoriesMock } from './mock/category.mock';

@Injectable()
export class CategoryService {
  getCategoryList(): ICategoriesResponse {
    return { categories: categoriesMock };
  }
}
