import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { ArticleModule } from './article/article.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './article/entities/article.entity';
import { UserEntity } from './user/entities/user.entity';
import { TransactionEntity } from './transaction/entities/transaction.entity';
import { CategoryEntity } from './category/entities/category.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    TaskModule,
    ArticleModule,
    UserModule,
    AuthModule,
    CategoryModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configServise: ConfigService) => ({
        type: 'postgres',
        host: configServise.get('DB_HOST'),
        port: configServise.get('DB_PORT'),
        username: configServise.get('DB_USERNAME'),
        password: configServise.get('DB_PASSWORD'),
        database: configServise.get('DB_NAME') as string,
        synchronize: true,
        entities: [
          ArticleEntity,
          UserEntity,
          TransactionEntity,
          CategoryEntity,
        ],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
