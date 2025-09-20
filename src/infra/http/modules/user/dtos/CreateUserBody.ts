import {
  IsEmail,
  IsNotEmpty,
  IsString,
  isString,
  MinLength,
} from 'class-validator'

export class CreateUserBody {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string
}
