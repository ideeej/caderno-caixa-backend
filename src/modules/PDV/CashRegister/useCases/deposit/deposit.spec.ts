import { Money } from 'src/modules/ERP/Money/Money'
import { CashRegisterState } from '../../CashRegister'
import { makeCashRegister } from '../../CashRegister.factory'
import { FakeCashRegisterRepository } from '../../repositories/CashRegisterFake.repository'
import { Deposit } from './deposit'
import { PaymentType } from 'src/modules/ERP/Payment/Payment'

let fakeCashRegisterRepository: FakeCashRegisterRepository
let depositUsecase: Deposit

describe('CashRegister Deposit Usecase', () => {
  beforeEach(() => {
    fakeCashRegisterRepository = new FakeCashRegisterRepository()
    depositUsecase = new Deposit(fakeCashRegisterRepository)
  })

  it('Should deposit amount to the cashRegister', async () => {
    const initialBalance = new Money('100')
    const defaultOperatorId = 'default_operator_id'

    const cashRegister = makeCashRegister({
      balance: { cash: initialBalance },
      state: CashRegisterState.OPEN,
      operatorId: defaultOperatorId,
    })

    await fakeCashRegisterRepository.save(cashRegister)

    await depositUsecase.execute(
      { amount: new Money('50'), type: PaymentType.CASH },
      defaultOperatorId
    )

    const testRegister =
      await fakeCashRegisterRepository.findActiveRegister(defaultOperatorId)
    if (testRegister) {
      expect(testRegister.balance.cash.value.toString()).toBe('150')
    }
  })
})
