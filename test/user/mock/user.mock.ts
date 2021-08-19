import { RegisterDto } from "src/auth/dto/register.dto";
import { User } from "src/user/user.model";

export const userModelMock: User = {
    id: 'userId',
    email:'user@email.com',
    password:"userPassword",
    username: "userName"
} as User

export const registerDtoMock: RegisterDto = {
    email: "user@email.com",
    password:"password!",
    username:"userName"
} as RegisterDto


export const newUser ={
    email: "user@email.com",
    password:"password!",
    username:"userName"
}


