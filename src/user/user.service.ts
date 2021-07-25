import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from 'src/auth/dto/LoginDto';
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('UserDto') private readonly userModel: Model<UserDto>,
  ) {}

  async create(newUser: UserDto): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    const addedUser = new this.userModel({
      ...newUser,
     password: hashedPassword
    });

    const result = await addedUser.save();
    return result;
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('could not find email');
    }
    return user;
  }
}
