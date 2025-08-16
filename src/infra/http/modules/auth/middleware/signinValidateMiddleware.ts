import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { SignInBody } from "../dtos/SignInBody";
import { validate } from "class-validator";

export class SignInValidateMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const body = req.body
        const signinBody = new SignInBody()
        signinBody.email = body.email
        signinBody.password = body.password

        const validations = await validate(signinBody)

        if (validations.length) {
            throw new BadRequestException(validations)
        }
        
        next()
    }

}