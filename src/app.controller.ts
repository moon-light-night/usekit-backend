import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { articlesMock } from './articles';
import * as os from 'os';
import { Article, IArticleResponse, IArticlesResponse } from './article.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello(os.userInfo().username);
  }
  @Get('/articles')
  index(): IArticlesResponse {
    return { articles: articlesMock };
  }

  @Get('/articles/:id')
  getArticleById(@Param('id', ParseIntPipe) id: number): IArticleResponse {
    const targetArticle: Article = articlesMock.find(
      (article) => article.id === id,
    );
    return { article: targetArticle };
  }

  @Post('/articles/create')
  createArticle(@Body() body: { article: Article }): IArticleResponse {
    console.log(body);
    const newArticle: Article = new Article(
      body.article.title,
      body.article.content,
      articlesMock.length + 1,
    );
    articlesMock.push(newArticle);
    return { article: newArticle };
  }
}
