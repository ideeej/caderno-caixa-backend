import { IsEmail, IsNotEmpty, IsString, isString } from "class-validator"

export class CreateUserBody {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    password: string
    
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

}