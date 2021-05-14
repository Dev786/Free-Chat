import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDTO {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    firstName: string;


    @IsNotEmpty()
    lastName: string;
    
    @IsEmail()
    email: string

}

export class LoginDTO {
    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string;
}