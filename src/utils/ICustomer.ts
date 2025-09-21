import { Address } from 'src/modules/ERP/Address/Address'
import { Email } from 'src/modules/ERP/Email/Email'
import { PhoneNumber } from 'src/modules/ERP/PhoneNumber/PhoneNumber'
import { CPF } from 'src/modules/ERP/CPF/CPF'
import { CNPJ } from 'src/modules/ERP/CNPJ/CNPJ'

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
