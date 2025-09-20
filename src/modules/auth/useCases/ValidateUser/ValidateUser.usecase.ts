import { Injectable, UnauthorizedException } from '@nestjs/common'
import { compare } from 'bcrypt'
import { User } from 'src/modules/auth/user/entities/User'
import { UserRepository } from 'src/modules/auth/user/repositories/User.repository'

interface ValidateUserRequest {
  email: string
  password: string
}

@Injectable()
export class ValidateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: ValidateUserRequest): Promise<User | UnauthorizedException> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new UnauthorizedException('Incorrect email or password.')
    }

    let passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new UnauthorizedException('Incorrect email or password.')
    }

    return user
  }
}
