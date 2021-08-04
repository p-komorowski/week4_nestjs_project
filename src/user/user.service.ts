import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async create(newUser: RegisterDto): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    const addedUser = new this.userModel({
      ...newUser,
     password: hashedPassword
    });
    addedUser.save();
    return (addedUser.email)
  }

  async findOne(email: string): Promise<RegisterDto> {
    const user = await this.userModel.findById(email);
    if (!user) {
      throw new NotFoundException('could not find email');
    }
    return user;
  }
}
