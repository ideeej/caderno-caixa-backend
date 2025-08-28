import { Injectable } from '@nestjs/common'
import { CashRegisterRepository } from '../../repositories/cashRegisterRepository'
import { Transaction } from 'src/utils/transaction'

@Injectable()
export class Withdraw {
  constructor(private cashRegisterRepository: CashRegisterRepository) {}

  async execute(
    { amount, type }: Transaction,
    operatorId: string
  ): Promise<void> {
    const cashRegister =
      await this.cashRegisterRepository.findActiveRegister(operatorId)

    if (cashRegister) {
      cashRegister.withdraw({ amount, type })
      await this.cashRegisterRepository.save(cashRegister)
    }
  }
}
