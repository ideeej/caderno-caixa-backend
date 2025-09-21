import { User } from '../entities/User'

type OverrideUser = Partial<User>

export const makeUser = ({ id, ...override }: OverrideUser) => {
  return new User(
    {
      email: 'email@gmail.com',
      password: '123456',
      name: 'Jedi',
      createdAt: new Date(),
      ...override,
    },
    id
  )
}
