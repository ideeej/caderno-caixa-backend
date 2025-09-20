import Decimal from 'decimal.js'
import { CashRegisterState } from '../../CashRegister'
import { makeCashRegister } from '../../CashRegister.factory'
import { FakeCashRegisterRepository } from '../../repositories/CashRegisterFake.repository'
import { Withdraw } from './withdraw'
import { PaymentType } from 'src/utils/Payment'

let fakeCashRegisterRepository: FakeCashRegisterRepository
let withdrawUsecase: Withdraw

describe('CashRegister Withdraw Usecase', () => {
  beforeEach(() => {
    fakeCashRegisterRepository = new FakeCashRegisterRepository()
    withdrawUsecase = new Withdraw(fakeCashRegisterRepository)
  })

  it('should withdraw money from the cash register', async () => {
    const initialBalance = Decimal('100')
    const defaultOperatorId = 'default_operator_id'
    const cashRegister = makeCashRegister({
      balance: { cash: initialBalance },
      state: CashRegisterState.OPEN,
      operatorId: defaultOperatorId,
    })

    await fakeCashRegisterRepository.save(cashRegister)

    await withdrawUsecase.execute(
      { amount: Decimal('50'), type: PaymentType.CASH },
      defaultOperatorId
    )

    const testRegister =
      await fakeCashRegisterRepository.findActiveRegister(defaultOperatorId)
    if (testRegister) {
      expect(testRegister.balance.cash).toEqual(Decimal('50'))
    }
  })

  it('should not be able to withdraw more money than there is in balance', async () => {
    const initialBalance = Decimal('100')
    const defaultOperatorId = 'default_operator_id'

    const cashRegister = makeCashRegister({
      balance: { cash: initialBalance },
      state: CashRegisterState.OPEN,
      operatorId: defaultOperatorId,
    })

    await fakeCashRegisterRepository.save(cashRegister)

    await expect(() =>
      withdrawUsecase.execute(
        { amount: Decimal('150'), type: PaymentType.CASH },
        defaultOperatorId
      )
    ).rejects.toThrow()
  })
})
