import { FakeUserRepository } from '../../repositories/User.repository.fake'
import { CreateUserUseCase } from './CreateUser.usecase'

let createUserUseCase: CreateUserUseCase
let fakeUserRepository: FakeUserRepository

describe('Create User', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    createUserUseCase = new CreateUserUseCase(fakeUserRepository)
  })
  it('Should create a new user', async () => {
    expect(fakeUserRepository.users).toEqual([])

    const user = await createUserUseCase.execute({
      email: 'test@email.com',
      password: '12345678',
      name: 'test name',
    })

    expect(fakeUserRepository.users).toEqual([user])
  })
})
