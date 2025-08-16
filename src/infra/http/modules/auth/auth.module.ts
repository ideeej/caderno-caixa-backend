import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "src/modules/auth/strategies/local.strategy";
import { ValidateUserUseCase } from "src/modules/auth/useCases/validadeUserUseCase/validateUserUseCase";
import { UserModule } from "../user/User.module";
import { DatabaseModule } from "src/infra/database/database.module";
import { SignInValidateMiddleware } from "./middleware/signinValidateMiddleware";
import { SignInUseCase } from "src/modules/auth/useCases/signinUseCase/signInUseCase";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "src/modules/auth/strategies/jwt.strategy";

@Module({
    imports: [DatabaseModule, UserModule, JwtModule.register({secret: process.env.JWT_SECRET, signOptions: {expiresIn: process.env.JWT_EXPIRE}})],
    controllers: [AuthController],
    providers: [LocalStrategy, JwtStrategy, ValidateUserUseCase, SignInUseCase]
})
export class AuthModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(SignInValidateMiddleware).forRoutes('signin')
    }
}