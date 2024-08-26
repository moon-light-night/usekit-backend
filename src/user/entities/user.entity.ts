import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArticleEntity } from '../../article/entities/article.entity';
import { TransactionEntity } from '../../transaction/entities/transaction.entity';
import { CategoryEntity } from '../../category/entities/category.entity';

@Entity()
export class UserEntity {
  @OneToMany(() => ArticleEntity, (article) => article.user, {
    onDelete: 'CASCADE',
  })
  articles: ArticleEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.user)
  transactions: TransactionEntity[];

  @OneToMany(() => CategoryEntity, (category) => category.user, {
    onDelete: 'CASCADE',
  })
  categories: CategoryEntity[];

  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
