import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { JwtAuthGuard } from './strategy/jwt-auth.guard';
import { AuthService } from './auth.service';
import {LoginDto} from "./dto/login.dto"
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthGuard } from '@nestjs/passport';


@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}


  @Post('auth/register')
  async register(@Body() req:RegisterDto) {
    return this.authService.register(req);
  }
  
 
  @Post('auth/login')
  async login(@Body() req:LoginDto) {
    return this.authService.login(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
