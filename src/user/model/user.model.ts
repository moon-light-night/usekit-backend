export class User {
  user_id?: number;
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}

export interface IUser {
  email: string;
  user_id: string;
}

export interface IUserRequest {
  user: IUser;
}

export interface IUserResponse {
  user: User;
}

export interface IUsersResponse {
  users: User[];
}
