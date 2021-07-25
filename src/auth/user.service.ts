import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'testname1',
      username: 'testusername1',
      email: 'test1@gmail.com',
      password: 'passwordtest1',
    },
    {
      id: 2,
      name: 'testname2',
      username: 'testusername2',
      email: 'test2@gmail.com',
      password: 'passwordtest2',
    },
  ];

  async findeOne(username: string): Promise<User> {
    return this.users.find((user) => user.username === username);
  }
}
