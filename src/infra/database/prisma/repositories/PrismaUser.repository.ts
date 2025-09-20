import { User } from 'src/modules/auth/user/entities/User'
import { UserRepository } from 'src/modules/auth/user/repositories/User.repository'
import { PrismaService } from '../prisma.service'
import { PrismaUserMapper } from '../mappers/PrismaUserMapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const prismaUser = PrismaUserMapper.toPrismaUser(user)

    await this.prisma.user.create({
      data: prismaUser,
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }
}
