import { Money } from 'src/modules/ERP/Money/Money'
import { CashRegister } from '../CashRegister'

export abstract class CashRegisterRepository {
  abstract save(cashRegister: CashRegister): Promise<CashRegister>
  abstract close(amount: Money, operatorId: string): Promise<void>
  abstract findActiveRegister(operatorId: string): Promise<CashRegister | null>
  abstract findRegisterById(
    cashRegisterId: string
  ): Promise<CashRegister | null>
}
