import { FakeUserRepository } from 'src/modules/auth/user/repositories/User.repository.fake'
import { ValidateUserUseCase } from './ValidateUser.usecase'
import { hash } from 'bcrypt'
import { makeUser } from 'src/modules/auth/user/factories/User.factory'
import { UnauthorizedException } from '@nestjs/common'

let validateUserUseCase: ValidateUserUseCase
let fakeUserRepository: FakeUserRepository

describe('Validate user', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    validateUserUseCase = new ValidateUserUseCase(fakeUserRepository)
  })

  it('Should return user if credentials match.', async () => {
    const rawPassword = '123456'

    const user = makeUser({ password: await hash(rawPassword, 10) })

    fakeUserRepository.users = [user]

    const result = await validateUserUseCase.execute({
      email: user.email,
      password: rawPassword,
    })

    expect(result).toEqual(user)
  })

  it('Should throw an Error when credentials do not match.', async () => {
    const rawPassword = '123'

    const user = makeUser({ password: await hash(rawPassword, 10) })

    fakeUserRepository.users = [user]

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(async () => {
      await validateUserUseCase.execute({
        email: 'incorrect@gmail.com',
        password: rawPassword,
      })
    }).rejects.toThrow(UnauthorizedException)

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(async () => {
      await validateUserUseCase.execute({
        email: user.email,
        password: 'incorrect password',
      })
    }).rejects.toThrow(UnauthorizedException)
  })
})
