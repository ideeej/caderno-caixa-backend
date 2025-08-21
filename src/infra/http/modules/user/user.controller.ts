import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserUseCase } from "src/modules/user/useCases/CreateUserUseCase/CreateUserUseCase";
import { CreateUserBody } from "./dtos/CreateUserBody";
import { UserViewModel } from "./viewModel/userViewModel";
import { Public } from "../auth/decorators/isPublic";

@Controller("users")
export class UserController {
    constructor(private readonly createUserUseCase: CreateUserUseCase) {

    }

    @Post()
    @Public()
    async createPost(@Body() body:CreateUserBody) {
        const {email, name, password} = body

        const user = await this.createUserUseCase.execute({email, name, password})
        return UserViewModel.toHTTP(user);
    }
}