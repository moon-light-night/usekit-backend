import { IsString } from 'class-validator';

export class ArticleDto {
  @IsString()
  title: string;
  @IsString()
  content: string;
}

export class ArticlePatchDto {
  @IsString()
  content: string;
}
