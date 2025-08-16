import { Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthRequestModule } from "./models/authRequestModule";
import { SignInUseCase } from "src/modules/auth/useCases/signinUseCase/signInUseCase";
import { LocalAuthGuard } from "./guards/localAuth.guard";
import { JwtAuthGuard } from "./guards/jwtAuth.guard";

@Controller()
export class AuthController {
    constructor(private signinUseCase: SignInUseCase) {}

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    async signIn(@Request() request : AuthRequestModule) {
        const access_token = await this.signinUseCase.execute({user:request.user})
        return {access_token}
    }

    @Get('test')
    async test() {
        return "test"
    }
}