import Decimal from 'decimal.js'
import { CashRegister } from '../entities/CashRegister'

export abstract class CashRegisterRepository {
  abstract save(cashRegister: CashRegister): Promise<CashRegister>
  abstract close(amount: Decimal, operatorId: string): Promise<void>
  abstract findActiveRegister(operatorId: string): Promise<CashRegister | null>
  abstract findRegisterById(
    cashRegisterId: string
  ): Promise<CashRegister | null>
}
