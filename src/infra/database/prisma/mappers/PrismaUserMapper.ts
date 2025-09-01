import { User } from 'src/modules/auth/user/entities/User'
import { Prisma, User as PrismaUser } from '@prisma/client'

export class PrismaUserMapper {
  static toPrismaUser({
    createdAt,
    name,
    email,
    password,
    id,
  }: User): PrismaUser {
    return {
      createdAt,
      id,
      name,
      email,
      password,
    }
  }

  static toDomain({ createdAt, name, email, password, id }: PrismaUser): User {
    return new User(
      {
        createdAt,
        name,
        email,
        password,
      },
      id
    )
  }
}
