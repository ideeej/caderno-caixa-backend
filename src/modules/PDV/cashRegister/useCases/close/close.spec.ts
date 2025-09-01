import Decimal from 'decimal.js'
import { CashRegisterState } from '../../entities/CashRegister'
import { makeCashRegister } from '../../factories/registerFactory'
import { FakeCashRegisterRepository } from '../../repositories/fakeCashRegisterRepository'
import { Close } from './close'
import { Balance } from 'src/utils/balance'

let fakeCashRegisterRepository: FakeCashRegisterRepository
let closeUseCase: Close

describe('CashRegister Close Usecase', () => {
  beforeEach(() => {
    fakeCashRegisterRepository = new FakeCashRegisterRepository()
    closeUseCase = new Close(fakeCashRegisterRepository)
  })

  it('Should close the cashRegister for this operator id', async () => {
    const initialBalance = Decimal('100')
    const declaredCash = Decimal('150')

    const testOperatorId = 'test_operator_id'
    const cashRegister = makeCashRegister({
      balance: { cash: initialBalance },
      state: CashRegisterState.OPEN,
      operatorId: testOperatorId,
    })

    fakeCashRegisterRepository.save(cashRegister)

    await closeUseCase.execute(declaredCash, testOperatorId)

    const closedRegister = await fakeCashRegisterRepository.findRegisterById(
      cashRegister.id
    )
    if (closedRegister) {
      expect(closedRegister.state).toBe(CashRegisterState.CLOSED)
      expect(closedRegister.closedAt).toBeInstanceOf(Date)
      expect(closedRegister.declaredCashClose).toEqual(declaredCash)
    }
  })
})
