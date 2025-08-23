import { makeUser } from 'src/modules/user/factories/userFactory'
import { CashRegister } from '../entities/CashRegister'

type OverrideCashRegister = Partial<CashRegister>

export const makeCashRegister = ({ id, ...override }: OverrideCashRegister) => {
  const fakeUser = makeUser({})

  return new CashRegister(
    {
      initialAmount: 1000,
      openedAt: new Date(),
      isOpen: true,
      userId: fakeUser.id,
      ...override,
    },
    id
  )
}
