import { RegisterDto } from "src/auth/dto/register.dto";
import { User } from "src/user/user.model";

export const userAuthModelMock: User = {
    id: 'userId',
    email:'user@email.com',
    password:"userPassword",
    username: "userName"
} as User

export const registerAuthDtoMock: RegisterDto = {
    email: "user@email.com",
    password:"password!",
    username:"userName"
} as RegisterDto


export const newUserAuth ={
    email: "user@email.com",
    password:"password!",
    username:"userName"
}