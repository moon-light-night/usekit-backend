import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/list')
  getArticleList() {
    return this.userService.getUserList();
  }

  @Post('/create')
  // функция, которая выполняется перед обработкой данных запроса, с помощью пайпа мы можем валидировать/трансформировать данные, своего рода middleware
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
