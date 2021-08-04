import { Exclude, Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';

@Exclude()
export class LoginDto {
  @Expose()
  @IsEmail()
  email: string;
  @Expose()
  password: string;
}
