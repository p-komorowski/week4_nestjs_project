import { Injectable,NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/user/user.model";
import { RegisterDto } from "../dto/register.dto";
import { UsersService } from '../../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from "../dto/login.dto";

@Injectable()
export class AuthRepository {
    constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel('User') private readonly userModel: Model <User>){}
    
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

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result
    }
  }

  async register(userData: RegisterDto): Promise<any> {
    return this.usersService.create(userData)
  }

  async login(user: LoginDto): Promise<any> {
    const payload = { sub: user.email, pass: user.password };
    const valUser = await this.validateUser(user.email, user.password);
    if (valUser) {
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new NotFoundException('cannot validate')
    }
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
}