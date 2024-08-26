export class User {
  user_id?: number;
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}

export interface IUserResponse {
  user: User;
}

export interface IUsersResponse {
  users: User[];
}
