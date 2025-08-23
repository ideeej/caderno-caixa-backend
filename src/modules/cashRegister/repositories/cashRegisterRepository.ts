import { CloseCashRegisterDTO } from '../dtos/closeCashRegisterDTO'
import { OpenCashRegisterDTO } from '../dtos/openCashRegisterDTO'
import { CashRegister } from '../entities/CashRegister'

export abstract class CashRegisterRepository {
  abstract openRegister({
    initialAmount,
    userId,
  }: OpenCashRegisterDTO): Promise<CashRegister | null>
  abstract closeRegister({
    closingAmount,
    userId,
  }: CloseCashRegisterDTO): Promise<void>

  abstract findRegisterById(
    cashRegisterId: string
  ): Promise<CashRegister | null>
  abstract findOpenRegister(userId: string): Promise<CashRegister | null>
  abstract findUserRegisters(userId: string): Promise<CashRegister[] | null>
}
