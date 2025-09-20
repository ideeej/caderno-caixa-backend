import { Entity } from 'src/modules/entity'
import { Address } from 'src/utils/Address'
import { CPF } from 'src/utils/CPF'
import { Email } from 'src/utils/Email'
import { ICustomer } from 'src/utils/ICustomer'
import { PhoneNumber } from 'src/utils/PhoneNumber'

export interface ClientProps {
  name: string
  cpf: CPF
  email?: Email
  phoneNumber?: PhoneNumber
  address?: Address
  birthDate?: Date
  isActive?: boolean
  createdAt: Date
  updatedAt: Date
}

export class Client extends Entity<ClientProps> implements ICustomer {
  constructor(
    props: Omit<ClientProps, 'createdAt' | 'updatedAt'>,
    id?: string
  ) {
    if (!props.name?.trim()) {
      throw new Error('Nome do cliente é obrigatório')
    }

    super(
      {
        ...props,
        isActive: props.isActive ?? true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      id
    )
  }

  // Getters
  get name(): string {
    return this.props.name
  }

  get cpf(): CPF {
    return this.props.cpf
  }

  get email(): Email | undefined {
    return this.props.email
  }

  get phoneNumber(): PhoneNumber | undefined {
    return this.props.phoneNumber
  }

  get address(): Address | undefined {
    return this.props.address
  }

  get birthDate(): Date | undefined {
    return this.props.birthDate
  }

  get isActive(): boolean {
    return this.props.isActive ?? true
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date {
    return this.props.updatedAt
  }

  // Update methods
  updateName(name: string): void {
    if (!name?.trim()) {
      throw new Error('Nome não pode ser vazio')
    }
    this.props.name = name.trim()
    this.props.updatedAt = new Date()
  }

  updateCPF(cpf: string): void {
    this.props.cpf = new CPF(cpf)
    this.props.updatedAt = new Date()
  }

  updateEmail(email: string): void {
    this.props.email = new Email(email)
    this.props.updatedAt = new Date()
  }

  updatePhoneNumber(phoneNumber: string): void {
    this.props.phoneNumber = new PhoneNumber(phoneNumber)
    this.props.updatedAt = new Date()
  }

  updateAddress(address: Address): void {
    this.props.address = address
    this.props.updatedAt = new Date()
  }

  updateBirthDate(birthDate: Date): void {
    this.props.birthDate = birthDate
    this.props.updatedAt = new Date()
  }

  // Status methods
  activate(): void {
    this.props.isActive = true
    this.props.updatedAt = new Date()
  }

  deactivate(): void {
    this.props.isActive = false
    this.props.updatedAt = new Date()
  }
}
