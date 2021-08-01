import { Exclude, Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

@Exclude()
export class UserDto extends mongoose.Document {
  @Expose()
  userId: string;
  @Expose()
  username: string;
  @Expose()
  @IsEmail()
  email: string;
  @Expose()
  password: string;
}
