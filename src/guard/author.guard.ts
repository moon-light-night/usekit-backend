import { BadRequestException, CanActivate, Injectable, NotFoundException } from "@nestjs/common";
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface';
import { TransactionService } from '../transaction/transaction.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly categoryService: CategoryService,
  ) {}

  async;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.params);
    const { id, type } = request.params;

    let entity;

    switch (type) {
      case 'finance':
        entity = await this.transactionService.findOne(id);
        break;

      case 'category':
        entity = await this.categoryService.getCategoryByUuid(id);
        break;

      default:
        throw new NotFoundException('Something went wrong');
        break;
    }

    const user = request.user;

    if (entity && user && entity.user.user_id === user.user_id) return true;

    throw new BadRequestException('Cannot access this action');
  }
}
