import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { ArticleEntity } from '../../article/entities/article.entity';
import { TransactionEntity } from '../../transaction/entities/transaction.entity';
import { CategoryEntity } from '../../category/entities/category.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  user_id: number;

  // @OneToMany(() => ArticleEntity, (article) => article.user, {
  //   onDelete: 'CASCADE',
  // })
  // articles: ArticleEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.user)
  transactions: TransactionEntity[];

  @OneToMany(() => CategoryEntity, (category) => category.user, {
    onDelete: 'CASCADE',
  })
  categories: CategoryEntity[];

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
