import { Injectable } from '@nestjs/common';
import { IUsersResponse } from './model/user.model';
import { usersMock } from './mock/user.mock';

@Injectable()
export class UserService {
  getUserList(): IUsersResponse {
    return { users: usersMock };
  }
}
