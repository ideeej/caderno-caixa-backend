import { User } from 'src/modules/auth/user/entities/User'

export class UserViewModel {
  static toHTTP({ createdAt, email, name, password, id }: User) {
    return {
      id,
      createdAt,
      name,
      email,
    }
  }
}
