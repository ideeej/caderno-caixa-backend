import { Request } from 'express'
import { User } from 'src/modules/auth/user/entities/User'

export class AuthRequestModel extends Request {
  user: User
}
