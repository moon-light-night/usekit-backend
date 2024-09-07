import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto, user_id: number) {
    const categories: CategoryEntity[] = await this.categoryRepository.findBy({
      user: { user_id } as UserEntity,
      title: createCategoryDto.title,
    });
    if (categories.length)
      throw new BadRequestException('This category already exists');
    const newCategory = {
      title: createCategoryDto.title,
      user: { user_id },
    };
    return await this.categoryRepository.save(newCategory);
  }

  async getCategoryByUuid(category_id: number): Promise<CategoryEntity> {
    const category: CategoryEntity = await this.categoryRepository.findOne({
      where: { category_id },
      relations: ['user', 'transactions'],
    });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async getCategoryListByUserId(user_id: number) {
    return await this.categoryRepository.find({
      where: { user: { user_id: user_id } as UserEntity },
      relations: { transactions: true },
    });
  }

  async updateCategory(
    category_id: number,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    const category: CategoryEntity = await this.categoryRepository.findOne({
      where: { category_id },
    });
    if (!category) throw new NotFoundException('Category not found');
    return await this.categoryRepository.update(category_id, updateCategoryDto);
  }

  async deleteCategory(category_id: number) {
    const category: CategoryEntity = await this.categoryRepository.findOne({
      where: { category_id },
    });
    if (!category) throw new NotFoundException('Category not found');
    return await this.categoryRepository.delete(category_id);
  }
}
