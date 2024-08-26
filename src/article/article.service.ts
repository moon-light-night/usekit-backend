import { Injectable } from '@nestjs/common';
import { articlesMock } from './mock/article.mock';
import {
  Article,
  IArticleResponse,
  IArticlesResponse,
} from './model/article.model';
import { ArticleDto, ArticlePatchDto } from './dto/article.dto';

@Injectable()
export class ArticleService {
  getArticleList(): IArticlesResponse {
    return { articles: articlesMock };
  }

  getArticleById(id: number): IArticleResponse {
    const targetArticle: Article = articlesMock.find(
      (article) => article.article_id === id,
    );
    return { article: targetArticle };
  }

  createArticle(articleDto: ArticleDto): IArticleResponse {
    const newArticle: Article = new Article(
      articleDto.title,
      articleDto.content,
      articlesMock.length + 1,
    );
    articlesMock.push(newArticle);
    return { article: newArticle };
  }

  updateArticleContent(
    id: number,
    updatedArticleDto: ArticlePatchDto,
  ): IArticleResponse {
    const targetArticle = articlesMock.find(
      (article) => article.article_id === id,
    );
    targetArticle.content = updatedArticleDto.content;
    return { article: targetArticle };
  }
}
