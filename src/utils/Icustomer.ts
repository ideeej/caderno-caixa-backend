import { Address } from 'src/utils/address'
import { Email } from 'src/utils/email'
import { PhoneNumber } from 'src/utils/phoneNumber'
import { CPF } from 'src/utils/cpf'
import { CNPJ } from 'src/utils/cnpj'

export type CustomerDocument = CPF | CNPJ

export interface ICustomer {
  id: string
  name: string // nome ou razão social
  document?: CustomerDocument // CPF ou CNPJ, opcional para consumidor não identificado
  email?: Email
  phoneNumber?: PhoneNumber
  address?: Address
  isActive: boolean
}
