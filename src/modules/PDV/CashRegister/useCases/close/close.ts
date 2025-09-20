import Decimal from 'decimal.js'
import { CashRegisterRepository } from '../../repositories/CashRegister.repository'

export class Close {
  constructor(private cashRegisterRepository: CashRegisterRepository) {}

  async execute(amount: Decimal, operatorId: string) {
    const cashRegister =
      await this.cashRegisterRepository.findActiveRegister(operatorId)

    if (cashRegister) {
      cashRegister.close(amount)
      await this.cashRegisterRepository.save(cashRegister)
    } else {
      throw new Error(
        '[USECASE] CloseCashRegister: Parece que não há um CashRegister aberto para ser fechado para este operador.'
      )
    }
  }
}
