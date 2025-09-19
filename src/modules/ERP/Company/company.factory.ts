import { Company, CompanyProps } from './company'
import { CNPJ } from 'src/utils/cnpj'
import { Address } from 'src/utils/address'
import { Email } from 'src/utils/email'
import { PhoneNumber } from 'src/utils/phoneNumber'

export const CLIENT_ID = 'CLIENT_TEST_ID'

export const TEST_COMPANY: CompanyProps = {
  corporateName: 'Empresa Teste LTDA',
  tradeName: 'Empresa Teste',
  cnpj: new CNPJ('56277351000107'),
  stateRegistration: '123456789',
  email: new Email('test@email.com'),
  phoneNumber: new PhoneNumber('11 9 7894 3210'),
  address: new Address({
    street: 'Rua Teste',
    number: '123',
    complement: 'Apto 1',
    neighborhood: 'Bairro Teste',
    city: 'Cidade Teste',
    state: 'ST',
    zip: '12345-678',
    country: 'Brasil',
  }),
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const makeCompany = (props: Partial<CompanyProps>, id?: string) => {
  return new Company(
    {
      ...TEST_COMPANY,
      ...props,
    },
    id ?? CLIENT_ID
  )
}
