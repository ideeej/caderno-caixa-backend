import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { UserRepository } from 'src/modules/auth/user/repositories/User.repository'
import { PrismaUserRepository } from './prisma/repositories/PrismaUser.repository'
import { SaleRepository } from 'src/modules/PDV/Sale/Sale.repository'
import { PrismaSaleRepository } from './prisma/repositories/PrismaSale.repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: SaleRepository,
      useClass: PrismaSaleRepository,
    },
  ],
  exports: [UserRepository, SaleRepository],
})
export class DatabaseModule {}
