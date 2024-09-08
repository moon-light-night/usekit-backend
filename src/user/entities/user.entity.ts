import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TransactionEntity } from '../../transaction/entities/transaction.entity';
import { CategoryEntity } from '../../category/entities/category.entity';
import { UserGender } from '../model/user.model';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  user_id: number;

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

  @Column('enum', { enum: UserGender })
  gender?: UserGender;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
