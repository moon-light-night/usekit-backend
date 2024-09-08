import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UserEntity } from '../user/entities/user.entity';
import { TransactionTypes } from './types/transaction.types';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, user_id: number) {
    const newTransaction = {
      title: createTransactionDto.title,
      amount: createTransactionDto.amount,
      type: createTransactionDto.type,
      user: { user_id },
      category: { category_id: createTransactionDto.category.category_id },
    };

    if (!newTransaction) throw new BadRequestException('Something went wrong');
    return await this.transactionRepository.save(newTransaction);
  }

  async findAll(user_id: number, transaction_type?: TransactionTypes) {
    const transactions = await this.transactionRepository.find({
      where: { user: { user_id } as UserEntity, type: transaction_type },
      order: {
        created_at: 'DESC',
      },
    });
    const total_amount = transactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0,
    );

    return {
      total_amount,
      transactions,
    };
  }

  async findOne(transaction_id) {
    console.log('transaction_id', transaction_id);
    const transaction = await this.transactionRepository.findOne({
      where: { transaction_id },
      relations: ['user', 'category'],
    });

    if (!transaction) throw new NotFoundException('Transaction not found');

    return transaction;
  }

  async findAllWithPagination(
    user_id: number,
    offset: number,
    row_count: number,
  ) {
    return await this.transactionRepository.find({
      where: { user: { user_id } as UserEntity },
      relations: ['user', 'category'],
      order: {
        created_at: 'DESC',
      },
      take: row_count,
      skip: offset,
    });
  }

  async remove(transaction_id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { transaction_id },
    });

    if (!transaction) throw new NotFoundException('Transaction not found');

    return await this.transactionRepository.delete(transaction_id);
  }
}
