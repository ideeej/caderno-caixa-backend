import { Transaction } from 'src/utils/transaction'
import { CashRegister } from '../entities/CashRegister'

export abstract class CashRegisterRepository {
  abstract save(cashRegister: CashRegister): Promise<CashRegister>
  abstract close(amount: number, operatorId: string): Promise<void>
  abstract deposit({ amount, type }: Transaction): Promise<void>
  abstract cashOut({ amount, type }: Transaction): Promise<void>

  abstract findActiveRegister(operatorId: string): Promise<CashRegister | null>
}
