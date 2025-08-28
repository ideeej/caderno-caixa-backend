import { CashRegisterState } from '../../entities/CashRegister'
import { makeCashRegister } from '../../factories/registerFactory'
import { FakeCashRegisterRepository } from '../../repositories/fakeCashRegisterRepository'
import { Deposit } from './deposit'

let fakeCashRegisterRepository: FakeCashRegisterRepository
let depositUsecase: Deposit

describe('Deposit use case', () => {
  beforeEach(() => {
    fakeCashRegisterRepository = new FakeCashRegisterRepository()
    depositUsecase = new Deposit(fakeCashRegisterRepository)
  })

  it('Should deposit amount to the cashRegister', async () => {
    const initialBalance = 100
    const defaultOperatorId = 'default_operator_id'
    const cashRegister = makeCashRegister({
      balance: { cash: initialBalance },
      state: CashRegisterState.OPEN,
      operatorId: defaultOperatorId,
    })

    await fakeCashRegisterRepository.save(cashRegister)

    await depositUsecase.execute(
      { amount: 50, type: 'cash' },
      defaultOperatorId
    )

    const testRegister =
      await fakeCashRegisterRepository.findActiveRegister(defaultOperatorId)
    if (testRegister) {
      expect(testRegister.balance.cash).toBe(150)
    }
  })
})
