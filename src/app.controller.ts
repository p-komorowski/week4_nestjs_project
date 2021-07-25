import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';

import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/strategy/jwt-auth.guard';
import { AuthService } from './user/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/register')
  async register(@Request() req) {
    return this.authService.register(req.body);
  }

  
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
