import { Operator } from './Opertor'

type OverrideCashRegister = Partial<Operator>

export const makeOperator = ({ id, ...override }: OverrideCashRegister) => {
  return new Operator(
    {
      name: 'Jedi',
    },
    id
  )
}
