import { CloseCashRegisterDTO } from '../dtos/closeCashRegisterDTO'
import { OpenCashRegisterDTO } from '../dtos/openCashRegisterDTO'
import { CashRegister } from '../entities/CashRegister'
import { makeCashRegister } from '../factories/registerFactory'
import { CashRegisterRepository } from './cashRegisterRepository'

export class FakeCashRegisterRepository implements CashRegisterRepository {
  public cashRegisters: CashRegister[] = []

  async openRegister({
    initialAmount,
    userId,
  }: OpenCashRegisterDTO): Promise<CashRegister | null> {
    const cashRegister = makeCashRegister({ initialAmount, userId })
    this.cashRegisters.push(cashRegister)

    return cashRegister ?? null
  }

  async closeRegister({
    closingAmount,
    userId,
  }: CloseCashRegisterDTO): Promise<void> {
    const cashRegister = this.cashRegisters.find(
      register => register.userId === userId && register.isOpen
    )

    if (cashRegister) {
      cashRegister.closedAt = new Date()
      cashRegister.isOpen = false
      cashRegister.closingAmount = closingAmount
    }
  }

  async findRegisterById(cashRegisterId: string): Promise<CashRegister | null> {
    return (
      this.cashRegisters.find(register => register.id === cashRegisterId) ??
      null
    )
  }

  async findOpenRegister(userId: string): Promise<CashRegister | null> {
    return (
      this.cashRegisters.find(
        register => register.userId === userId && register.isOpen
      ) ?? null
    )
  }

  async findUserRegisters(userId: string): Promise<CashRegister[] | null> {
    return (
      this.cashRegisters.filter(register => register.userId === userId) ?? null
    )
  }
}
