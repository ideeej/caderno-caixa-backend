import { Injectable } from '@nestjs/common'
import { CashRegisterRepository } from '../../repositories/cashRegisterRepository'
import { CloseCashRegisterDTO } from '../../dtos/closeCashRegisterDTO'

interface CloseCashRegisterRequest {
  closingAmount: Number
  userId: string
  id: string
}

@Injectable()
export class CloseCashRegister {
  constructor(private cashRegisterRepository: CashRegisterRepository) {}

  async execute({
    closingAmount,
    userId,
  }: CloseCashRegisterDTO): Promise<void> {
    const userRegisters =
      await this.cashRegisterRepository.findUserRegisters(userId)

    if (userRegisters) {
      const openCashRegister = userRegisters.find(r => r.isOpen)

      if (openCashRegister) {
        openCashRegister.closingAmount = closingAmount

        this.cashRegisterRepository.closeRegister({
          userId: openCashRegister.userId,
          closingAmount: openCashRegister.closingAmount,
        })
      }
    }
  }
}
