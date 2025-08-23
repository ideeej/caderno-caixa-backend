import { makeUser } from 'src/modules/user/factories/userFactory'
import { FakeCashRegisterRepository } from '../../repositories/fakeCashRegisterRepository'
import { OpenCashRegister } from './openCashRegister'
import { User } from 'src/modules/user/entities/User'

let fakeCashRegisterRepository: FakeCashRegisterRepository
let openCashRegister: OpenCashRegister
let user: User

describe('Open Cash Register', () => {
  beforeEach(() => {
    fakeCashRegisterRepository = new FakeCashRegisterRepository()
    openCashRegister = new OpenCashRegister(fakeCashRegisterRepository)
    user = makeUser({})
  })

  it('Should open a cash register.', async () => {
    expect(fakeCashRegisterRepository.cashRegisters).toEqual([])

    const defaultInitialAmount = 1000

    const cashRegister = await openCashRegister.execute({
      initialAmount: defaultInitialAmount,
      userId: user.id,
    })

    expect(fakeCashRegisterRepository.cashRegisters).toEqual([cashRegister])

    if (cashRegister) {
      expect(cashRegister.isOpen).toEqual(true)
      expect(cashRegister.initialAmount).toEqual(defaultInitialAmount)
    }
  })
})
