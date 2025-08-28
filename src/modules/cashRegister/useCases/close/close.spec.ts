import { CashRegisterState } from '../../entities/CashRegister'
import { makeCashRegister } from '../../factories/registerFactory'
import { FakeCashRegisterRepository } from '../../repositories/fakeCashRegisterRepository'
import { Close } from './close'

let fakeCashRegisterRepository: FakeCashRegisterRepository
let closeUseCase: Close

describe('Close cash register', () => {
  beforeEach(() => {
    fakeCashRegisterRepository = new FakeCashRegisterRepository()
    closeUseCase = new Close(fakeCashRegisterRepository)
  })

  it('Should close the cashRegister for this operator id', async () => {
    const initialBalance = 100
    const declaredCash = 150

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
      expect(closedRegister.declaredCashClose).toBe(declaredCash)
    }
  })
})
