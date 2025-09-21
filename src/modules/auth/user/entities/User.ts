import { Entity } from 'src/modules/entity'

interface UserProps {
  email: string
  password: string
  name: string
  createdAt: Date
}

export class User extends Entity<UserProps> {
  constructor(props: UserProps, id?: string) {
    super(props, id)
  }

  get email() {
    return this.props.email
  }

  set email(email) {
    this.props.email = email
  }

  get password() {
    return this.props.password
  }

  set password(password) {
    this.props.password = password
  }

  get name() {
    return this.props.name
  }

  set name(name) {
    this.props.name = name
  }

  get createdAt() {
    return this.props.createdAt
  }
}
