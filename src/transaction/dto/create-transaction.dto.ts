import { CategoryEntity } from '../../category/entities/category.entity';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserEntity } from '../../user/entities/user.entity';

export class CreateTransactionDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsString()
  @MinLength(6)
  type: 'expense' | 'income';

  @IsNotEmpty()
  category: CategoryEntity;

  @IsOptional()
  user: UserEntity;
}
