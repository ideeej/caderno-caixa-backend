import { Address } from 'src/utils/Address'
import { Email } from 'src/utils/Email'
import { PhoneNumber } from 'src/utils/PhoneNumber'
import { CPF } from 'src/utils/CPF'
import { CNPJ } from 'src/utils/CNPJ'

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
