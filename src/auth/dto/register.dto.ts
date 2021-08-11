import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsString, Matches } from 'class-validator';

@Exclude()
export class RegisterDto {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @Matches(/^[a-z]+[!@#$%^&*()=_{}:;"'<,.>?€]$/g)
  password: string;
  
  @Expose()
  @IsString()
  username: string
}
