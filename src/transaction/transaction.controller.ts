import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IUserRequest } from '../user/model/user.model';
import { AuthorGuard } from '../guard/author.guard';
import { TransactionTypes } from './types/transaction.types';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('/create')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
    @Req() req: IUserRequest,
  ) {
    return this.transactionService.create(
      createTransactionDto,
      +req.user.user_id,
    );
  }

  @Get('/pagination')
  @UseGuards(JwtAuthGuard)
  findAllWithPagination(
    @Req() req: IUserRequest,
    @Query('offset') offset: string = '0',
    @Query('row_count') row_count: string = '10',
  ) {
    return this.transactionService.findAllWithPagination(
      +req.user.user_id,
      +offset,
      +row_count,
    );
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req: IUserRequest, @Query('type') type?: TransactionTypes) {
    return this.transactionService.findAll(+req.user.user_id, type);
  }

  @Get(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.transactionService.findOne(id);
  }

  @Delete(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.transactionService.remove(id);
  }
}
