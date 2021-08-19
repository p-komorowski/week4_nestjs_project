import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { UsersModule } from '../user/users.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
  AuthModule,
    UsersModule,
    PassportModule,
    JwtService,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1200s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy,JwtService],
  exports: [AuthService,JwtStrategy]
})
export class AuthModule {}
