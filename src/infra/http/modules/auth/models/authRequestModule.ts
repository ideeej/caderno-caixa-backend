import { Request } from "express";
import { User } from "src/modules/user/entities/User";

export class AuthRequestModule extends Request{
    user: User;
}