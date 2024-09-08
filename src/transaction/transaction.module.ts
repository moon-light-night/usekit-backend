import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { CategoryEntity } from '../category/entities/category.entity';
import { CategoryService } from '../category/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity, CategoryEntity])],
  controllers: [TransactionController],
  providers: [TransactionService, CategoryService],
})
export class TransactionModule {}
