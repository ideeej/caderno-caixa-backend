import { CashRegister, CashRegisterState } from '../../CashRegister'
import { FakeCashRegisterRepository } from '../../repositories/CashRegisterFake.repository'
import { OpenCashRegister } from './open'
import { makeCashRegister } from '../../CashRegister.factory'
import { Money } from 'src/modules/ERP/Money/Money'

let fakeCashRegisterRepository: FakeCashRegisterRepository
let openCashRegister: OpenCashRegister

describe('CashRegister Open Usecase', () => {
  beforeEach(() => {
    fakeCashRegisterRepository = new FakeCashRegisterRepository()
    openCashRegister = new OpenCashRegister(fakeCashRegisterRepository)
  })

  it('Should open a cash register with a given initialAmount.', async () => {
    const request = {
      operatorId: 'test-user-1',
      amount: new Money('150'),
    }

    const cashRegister = await openCashRegister.execute(request)

    expect(cashRegister).toBeInstanceOf(CashRegister)
    expect(cashRegister.operatorId).toBe(request.operatorId)
    expect(cashRegister.balance.cash).toEqual(request.amount)
    expect(cashRegister.state).toBe(CashRegisterState.OPEN)
  })

  it('Should throw an error when the operator already has a cash register open', async () => {
    const cashRegister = makeCashRegister({
      operatorId: 'test-user-1',
      state: CashRegisterState.OPEN,
    })

    const request = {
      operatorId: 'test-user-1',
      amount: new Money('100'),
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fakeCashRegisterRepository.save(cashRegister)

    await expect(openCashRegister.execute(request)).rejects.toThrow()
  })

  it('Should persist the cashRegister on the repository', async () => {
    const request = {
      operatorId: 'test-user-1',
      amount: new Money('100'),
    }

    await openCashRegister.execute(request)
    expect(fakeCashRegisterRepository.cashRegisters).toHaveLength(1)
    expect(fakeCashRegisterRepository.cashRegisters[0]).toBeInstanceOf(
      CashRegister
    )
  })

  it('Should return the cashRegister', async () => {
    const request = {
      operatorId: 'test-user-1',
      amount: new Money('100'),
    }

    const cashRegister = await openCashRegister.execute(request)
    expect(cashRegister).toBeInstanceOf(CashRegister)
  })

  it('Should not open a cashRegister without an operatorId', async () => {
    const request = {
      operatorId: '',
      amount: new Money('100'),
    }

    await expect(() => openCashRegister.execute(request)).rejects.toThrow()

    const request2 = {
      operatorId: '     ',
      amount: new Money('100'),
    }

    await expect(() => openCashRegister.execute(request2)).rejects.toThrow()
  })
})
