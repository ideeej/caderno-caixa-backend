import { Entity } from 'src/modules/entity'
import { Address } from 'src/modules/ERP/Address/Address'
import { Email } from 'src/modules/ERP/Email/Email'
import { PhoneNumber } from 'src/modules/ERP/PhoneNumber/PhoneNumber'

interface SupplierProps {
  corporateName: string
  tradeName?: string
  cnpj: string
  email?: Email
  phoneNumber?: PhoneNumber
  address?: Address
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export class Supplier extends Entity<SupplierProps> {
  constructor(
    props: Omit<SupplierProps, 'createdAt' | 'updatedAt' | 'isActive'>,
    id?: string
  ) {
    if (!props.corporateName?.trim()) {
      throw new Error('Razão social é obrigatória')
    }

    if (!props.cnpj?.trim()) {
      throw new Error('CNPJ é obrigatório')
    }

    // TODO: Adicionar validação de CNPJ quando tivermos o value object

    super(
      {
        ...props,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      id
    )
  }

  // Getters
  get corporateName(): string {
    return this.props.corporateName
  }

  get tradeName(): string | undefined {
    return this.props.tradeName
  }

  get cnpj(): string {
    return this.props.cnpj
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
    return this.props.isActive
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
      throw new Error('Razão social não pode ser vazia')
    }
    this.props.corporateName = corporateName.trim()
    this.props.updatedAt = new Date()
  }

  updateTradeName(tradeName: string): void {
    this.props.tradeName = tradeName?.trim()
    this.props.updatedAt = new Date()
  }

  updateCNPJ(cnpj: string): void {
    if (!cnpj?.trim()) {
      throw new Error('CNPJ não pode ser vazio')
    }
    // TODO: Adicionar validação de CNPJ
    this.props.cnpj = cnpj.trim()
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
