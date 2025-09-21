import { Client, ClientProps } from './Client'
import { CPF } from 'src/modules/ERP/CPF/CPF'

export const CLIENT_ID = 'CLIENT_TEST_ID'

export const TEST_CLIENT: ClientProps = {
  name: 'Test Client',
  cpf: new CPF('77556394018'),
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const makeClient = (props: Partial<ClientProps>, id?: string) => {
  return new Client(
    {
      ...TEST_CLIENT,
      ...props,
    },
    id ?? CLIENT_ID
  )
}
