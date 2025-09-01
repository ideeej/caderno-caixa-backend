import { JwtService } from '@nestjs/jwt'
import { SignInUseCase } from './signInUseCase'
import { makeUser } from 'src/modules/auth/user/factories/userFactory'
import { UserPayload } from '../../models/UserPayload'

let signInUseCase: SignInUseCase
let jwtService: JwtService

describe('Sign in User payload using JWT', () => {
  beforeEach(() => {
    jwtService = new JwtService({ secret: 'secret' })
    signInUseCase = new SignInUseCase(jwtService)
  })

  it('Should be able to create a valid jwt_access_token', async () => {
    const user = makeUser({})
    const token = await signInUseCase.execute({ user })
    const payload = jwtService.decode(token) as UserPayload

    expect(payload.sub).toEqual(user.id)
  })
})
