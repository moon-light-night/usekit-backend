export class Article {
  article_id: number;
  title: string;
  content: string;

  constructor(title: string, content: string, article_id: number) {
    this.article_id = article_id;
    this.title = title;
    this.content = content;
  }
}

export interface IArticleResponse {
  article: Article;
}

export interface IArticlesResponse {
  articles: Article[];
}
