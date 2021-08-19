import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './user-repository/user.repository';
import { UserSchema } from './user.model';
import { UsersService } from './user.service';

@Module({
  providers: [UsersService, UserRepository],
  exports: [UsersService],
  imports: [
    MongooseModule.forFeature([
      { name: 'User', collection: 'users', schema: UserSchema },
    ]),
  ],
})
export class UsersModule {}
