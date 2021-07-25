

import { Injectable } from '@nestjs/common';
import { UsersService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/auth/dto/LoginDto';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
  }
  async register(userData:UserDto): Promise<any>{
  return await this.usersService.create(userData);
}

  async login(user: UserDto): Promise<any> {
    const payload = { sub: user.email, pass: user.password};
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

 

