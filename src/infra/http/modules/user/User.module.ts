import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { CreateUserUseCase } from 'src/modules/auth/user/useCases/CreateUserUseCase/CreateUserUseCase'
import { DatabaseModule } from 'src/infra/database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [CreateUserUseCase],
})
export class UserModule {}
