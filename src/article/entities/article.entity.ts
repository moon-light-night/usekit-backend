import {
  Column,
  CreateDateColumn,
  Entity,
  // JoinColumn,
  // ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// import { UserEntity } from '../../user/entities/user.entity';

@Entity()
export class ArticleEntity {
  @PrimaryGeneratedColumn({ name: 'article_id' })
  article_id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  // @ManyToOne(() => UserEntity, (user) => user.articles)
  // @JoinColumn({ name: 'user_id' })
  // user: UserEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
