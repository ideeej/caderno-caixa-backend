import { Money } from 'src/modules/ERP/Money/Money'
import { CashRegisterState } from '../../CashRegister'
import { makeCashRegister } from '../../CashRegister.factory'
import { FakeCashRegisterRepository } from '../../repositories/CashRegisterFake.repository'
import { Close } from './close'

let fakeCashRegisterRepository: FakeCashRegisterRepository
let closeUseCase: Close

describe('CashRegister Close Usecase', () => {
  beforeEach(() => {
    fakeCashRegisterRepository = new FakeCashRegisterRepository()
    closeUseCase = new Close(fakeCashRegisterRepository)
  })

  it('Should close the cashRegister for this operator id', async () => {
    const initialBalance = new Money('100')
    const declaredCash = new Money('150')

    const testOperatorId = 'test_operator_id'
    const cashRegister = makeCashRegister({
      balance: { cash: initialBalance },
      state: CashRegisterState.OPEN,
      operatorId: testOperatorId,
    })

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
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
