import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto} from 'src/auth/dto/login.dto';
import { RegisterDto } from './dto/register.dto';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
  }
  async register(userData:RegisterDto): Promise<any>{
  return await this.usersService.create(userData);
  
}

  async login(user: LoginDto): Promise<any> {
    const payload = { sub: user.email, pass: user.password};
    const valUser = await this.validateUser(user.password,user.email)
    if (valUser)
    return {
      access_token: this.jwtService.sign(payload),
    };
    else 
    throw new NotFoundException ("cannot validate")
  }
}

 

