import Decimal from 'decimal.js'
import { CashRegister, CashRegisterState } from '../CashRegister'
import { CashRegisterRepository } from './cashRegisterRepository'

export class FakeCashRegisterRepository implements CashRegisterRepository {
  public cashRegisters: CashRegister[] = []

  async save(cashRegister: CashRegister): Promise<CashRegister> {
    const existingIndex = this.cashRegisters.findIndex(
      r => r.id === cashRegister.id
    )
    if (existingIndex !== -1) {
      // This register already exists at cashRegisters[existingIndex]
      this.cashRegisters[existingIndex] = cashRegister
      return this.cashRegisters[existingIndex]
    } else {
      // This is a new register, just push it
      const registers = this.cashRegisters.push(cashRegister)
      return this.cashRegisters[registers - 1]
    }
  }

  async close(amount: Decimal, operatorId: string): Promise<void> {
    const cashRegister = await this.findActiveRegister(operatorId)

    if (cashRegister) {
      cashRegister.close(amount)
    }
  }

  async findActiveRegister(operatorId: string): Promise<CashRegister | null> {
    return (
      this.cashRegisters.find(
        r => r.state === CashRegisterState.OPEN && operatorId === r.operatorId
      ) ?? null
    )
  }

  async findRegisterById(cashRegisterId: string): Promise<CashRegister | null> {
    return this.cashRegisters.find(r => cashRegisterId === r.id) ?? null
  }
}
