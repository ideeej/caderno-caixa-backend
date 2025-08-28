import { CashRegisterState } from '../../entities/CashRegister'
import { makeCashRegister } from '../../factories/registerFactory'
import { FakeCashRegisterRepository } from '../../repositories/fakeCashRegisterRepository'
import { Withdraw } from './withdraw'

let fakeCashRegisterRepository: FakeCashRegisterRepository
let withdrawUsecase: Withdraw

describe('Withdraw use case', () => {
  beforeEach(() => {
    fakeCashRegisterRepository = new FakeCashRegisterRepository()
    withdrawUsecase = new Withdraw(fakeCashRegisterRepository)
  })

  it('should withdraw money from the cash register', async () => {
    const initialBalance = 100
    const defaultOperatorId = 'default_operator_id'
    const cashRegister = makeCashRegister({
      balance: { cash: initialBalance },
      state: CashRegisterState.OPEN,
      operatorId: defaultOperatorId,
    })

    await fakeCashRegisterRepository.save(cashRegister)

    await withdrawUsecase.execute(
      { amount: 50, type: 'cash' },
      defaultOperatorId
    )

    const testRegister =
      await fakeCashRegisterRepository.findActiveRegister(defaultOperatorId)
    if (testRegister) {
      expect(testRegister.balance.cash).toBe(50)
    }
  })

  it('should not be able to withdraw more money than there is in balance', async () => {
    const initialBalance = 100
    const defaultOperatorId = 'default_operator_id'
    const cashRegister = makeCashRegister({
      balance: { cash: initialBalance },
      state: CashRegisterState.OPEN,
      operatorId: defaultOperatorId,
    })

    await fakeCashRegisterRepository.save(cashRegister)

    await expect(() =>
      withdrawUsecase.execute({ amount: 150, type: 'cash' }, defaultOperatorId)
    ).rejects.toThrow()
  })
})
