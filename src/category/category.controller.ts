import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/list')
  @UseGuards(JwtAuthGuard)
  getCategoryListByUserId(@Req() req) {
    return this.categoryService.getCategoryListByUserId(+req.user.user_id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getCategoryByUuid(@Param('id') id: string) {
    return this.categoryService.getCategoryByUuid(+id);
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  createCategory(@Body() createCategoryDto: CreateCategoryDto, @Req() req) {
    return this.categoryService.createCategory(
      createCategoryDto,
      +req.user.user_id,
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(+id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(+id);
  }
}
