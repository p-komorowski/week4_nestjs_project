import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { UserRepository } from './user-repository/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UserRepository) {}

  async create(newUser: RegisterDto): Promise<User> {
    const userReg = await this.repository.findOne(newUser.email);
    if (!userReg) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newUser.password, salt);
      const addedUser = await this.repository.save({
        ...newUser,
        password: hashedPassword,
      });
      return addedUser.save()
    } else {
      throw new NotFoundException('email already in database');
    }
  }

  async findOne(email: string): Promise<RegisterDto> {
    const user = await this.repository.findOne(email);
    if (!user) {
      throw new NotFoundException('could not find email');
    }
    return user
  }
}
