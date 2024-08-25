import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { IArticleResponse } from './article.model';
import { ArticleDto, ArticlePatchDto } from './article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() body: { article: ArticleDto }): IArticleResponse {
    return this.articleService.createArticle(body.article);
  }

  @Patch('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ArticlePatchDto,
  ): IArticleResponse {
    return this.articleService.updateArticleContent(id, dto);
  }

  @Get('/list')
  getArticleList() {
    return this.articleService.getArticleList();
  }

  @Get('/:id')
  getArticle(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.getArticleById(id);
  }
}
