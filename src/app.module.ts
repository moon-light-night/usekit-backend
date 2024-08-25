import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [TaskModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
