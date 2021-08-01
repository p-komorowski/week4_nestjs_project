import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDto, UserSchema } from 'src/auth/dto/LoginDto';
import { UsersService } from './user.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [
    MongooseModule.forFeature([{ name: 'UserDto', schema: UserSchema }]),
  ],
})
export class UsersModule {}
