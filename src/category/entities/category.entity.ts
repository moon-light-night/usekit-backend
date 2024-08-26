import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { TransactionEntity } from '../../transaction/entities/transaction.entity';

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn({ name: 'category_id' })
  category_id: number;

  @Column()
  name: string;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.category)
  transactions: TransactionEntity[];

  @ManyToOne(() => UserEntity, (user) => user.categories)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
