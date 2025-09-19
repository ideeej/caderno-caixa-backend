import { Entity } from 'src/modules/entity'
import { Address } from 'src/utils/address'
import { CNPJ } from 'src/utils/cnpj'
import { Email } from 'src/utils/email'
import { ICustomer, CustomerDocument } from 'src/utils/Icustomer'
import { PhoneNumber } from 'src/utils/phoneNumber'

export interface CompanyProps {
  corporateName: string // Razão Social
  tradeName?: string // Nome Fantasia
  cnpj: CNPJ
  stateRegistration?: string // Inscrição Estadual
  email?: Email
  phoneNumber?: PhoneNumber
  address?: Address
  isActive?: boolean
  createdAt: Date
  updatedAt: Date
}

export class Company extends Entity<CompanyProps> implements ICustomer {
  constructor(
    props: Omit<CompanyProps, 'createdAt' | 'updatedAt'>,
    id?: string
  ) {
    if (!props.corporateName?.trim()) {
      throw new Error('Razão Social é obrigatória')
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

  get name(): string {
    return this.props.corporateName
  }

  get document(): CustomerDocument {
    return this.props.cnpj
  }

  // Getters
  get corporateName(): string {
    return this.props.corporateName
  }

  get tradeName(): string | undefined {
    return this.props.tradeName
  }

  get cnpj(): CNPJ {
    return this.props.cnpj
  }

  get stateRegistration(): string | undefined {
    return this.props.stateRegistration
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
  updateCorporateName(corporateName: string): void {
    if (!corporateName?.trim()) {
      throw new Error('Razão Social não pode ser vazia')
    }
    this.props.corporateName = corporateName.trim()
    this.props.updatedAt = new Date()
  }

  updateTradeName(tradeName: string): void {
    this.props.tradeName = tradeName?.trim()
    this.props.updatedAt = new Date()
  }

  updateCNPJ(cnpj: string): void {
    this.props.cnpj = new CNPJ(cnpj)
    this.props.updatedAt = new Date()
  }

  updateStateRegistration(stateRegistration: string): void {
    this.props.stateRegistration = stateRegistration?.trim()
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
