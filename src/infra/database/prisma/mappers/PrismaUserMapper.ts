import { User } from "src/modules/user/entities/User";
import { User as PrismaUser } from '@prisma/client';

export class PrismaUserMapper {
    static toPrismaUser({createdAt, name, email, password, id}: User): PrismaUser {
        return {
            createdAt,
            id,
            name,
            email,
            password
        }
    }
}