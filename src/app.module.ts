import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { UserModule } from './infra/http/modules/user/User.module'
import { DatabaseModule } from './infra/database/database.module'
import { AuthModule } from './infra/http/modules/auth/auth.module'
import { SaleModule } from './modules/PDV/Sale/Sale.module'
import { JwtAuthGuard } from './infra/http/modules/auth/guards/jwtAuth.guard'

@Module({
  imports: [SaleModule, UserModule, DatabaseModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
