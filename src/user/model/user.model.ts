export class User {
  user_id: number;
  first_name: string;
  last_name: string;
  age: number;
  email: string;

  constructor(
    first_name: string,
    last_name: string,
    age: number,
    email: string,
    user_id: number,
  ) {
    this.user_id = user_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.age = age;
    this.email = email;
  }
}

export interface IUserResponse {
  user: User;
}

export interface IUsersResponse {
  users: User[];
}
