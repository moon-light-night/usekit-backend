import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ICategoriesResponse } from './model/category.model';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/list')
  getArticleList(): ICategoriesResponse {
    return this.categoryService.getCategoryList();
  }
}
