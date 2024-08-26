import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity()
export class TransactionEntity {
  @ManyToOne(() => UserEntity, (user) => user.transactions)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @PrimaryColumn({ name: 'transaction_id' })
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  type: string;

  @Column()
  amount: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
