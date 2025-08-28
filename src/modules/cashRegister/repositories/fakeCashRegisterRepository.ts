import { Transaction } from 'src/utils/transaction'
import { CashRegister, CashRegisterState } from '../entities/CashRegister'
import { CashRegisterRepository } from './cashRegisterRepository'

export class FakeCashRegisterRepository implements CashRegisterRepository {
  public cashRegisters: CashRegister[] = []

  async save(cashRegister: CashRegister): Promise<CashRegister> {
    const registers = this.cashRegisters.push(cashRegister)
    return this.cashRegisters[registers - 1]
  }

  async close(amount: number, operatorId: string): Promise<void> {
    const cashRegister = await this.findActiveRegister(operatorId)

    if (cashRegister) {
      cashRegister.close(amount)
    }
  }

  async deposit({ amount, type }: Transaction): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async cashOut({ amount, type }: Transaction): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findActiveRegister(operatorId: string): Promise<CashRegister | null> {
    return (
      this.cashRegisters.find(
        r => r.state === CashRegisterState.OPEN && operatorId === r.operatorId
      ) ?? null
    )
  }
}
