import Decimal from 'decimal.js'
import { CashRegisterState } from '../../entities/CashRegister'
import { makeCashRegister } from '../../factories/registerFactory'
import { FakeCashRegisterRepository } from '../../repositories/fakeCashRegisterRepository'
import { Deposit } from './deposit'
import { PaymentType } from 'src/utils/paymentType'
import { Balance } from 'src/utils/balance'

let fakeCashRegisterRepository: FakeCashRegisterRepository
let depositUsecase: Deposit

describe('CashRegister Deposit Usecase', () => {
  beforeEach(() => {
    fakeCashRegisterRepository = new FakeCashRegisterRepository()
    depositUsecase = new Deposit(fakeCashRegisterRepository)
  })

  it('Should deposit amount to the cashRegister', async () => {
    const initialBalance = Decimal('100')
    const defaultOperatorId = 'default_operator_id'

    const cashRegister = makeCashRegister({
      balance: { cash: initialBalance },
      state: CashRegisterState.OPEN,
      operatorId: defaultOperatorId,
    })

    await fakeCashRegisterRepository.save(cashRegister)

    await depositUsecase.execute(
      { amount: Decimal('50'), type: PaymentType.CASH },
      defaultOperatorId
    )

    const testRegister =
      await fakeCashRegisterRepository.findActiveRegister(defaultOperatorId)
    if (testRegister) {
      expect(testRegister.balance.cash).toEqual(Decimal('150'))
    }
  })
})
