import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  email: string;
  @IsString()
  user_id: string;
}

export class CreateUserDto {
  @IsEmail()
  email: string;
  @MinLength(6, { message: 'Password must be more than 6 characters' })
  password: string;
}
