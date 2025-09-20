import { User } from '../entities/User'
import { UserRepository } from './User.repository'

export class FakeUserRepository implements UserRepository {
  public users: User[] = []

  async create(user: User): Promise<void> {
    this.users.push(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
