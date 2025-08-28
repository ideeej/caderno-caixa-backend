import { Operator } from '../entities/operator'

type OverrideCashRegister = Partial<Operator>

export const makeOperator = ({ id, ...override }: OverrideCashRegister) => {
  return new Operator(
    {
      name: 'Jedi',
    },
    id
  )
}
