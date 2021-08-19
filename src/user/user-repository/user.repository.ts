import { Injectable,NotFoundException  } from "@nestjs/common";
import { InjectModel} from "@nestjs/mongoose";
import { User } from "../user.model";
import {Model} from "mongoose";
import { RegisterDto } from "src/auth/dto/register.dto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserRepository {
    constructor(@InjectModel('User') private readonly userModel: Model <User>){}
    
  async findOne(email: string): Promise<RegisterDto> {
    const user = await this.userModel
      .findOne({
        email: email
      })
      .exec();
    if (!user) {
      throw new NotFoundException('could not find email');
    }
    return user
  }

  async create(newUser: RegisterDto): Promise<any> {
    const userReg = await this.userModel.findOne({ email: newUser.email });
    if (!userReg) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newUser.password, salt);
      const addedUser = new this.userModel({
        ...newUser,
        password: hashedPassword,
      });
      return addedUser
    } else {
      throw new NotFoundException('email already in database');
    }
  }
  async save(doc: RegisterDto): Promise<User> {
    const product = new this.userModel(doc);
    return product.save();
  }
}
