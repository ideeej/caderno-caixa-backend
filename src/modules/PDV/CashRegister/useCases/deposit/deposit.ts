import { Injectable } from '@nestjs/common'
import { CashRegisterRepository } from '../../repositories/CashRegister.repository'
import { PaymentProps } from 'src/utils/Payment'

@Injectable()
export class Deposit {
  constructor(private cashRegisterRepository: CashRegisterRepository) {}

  async execute(
    { amount, type }: PaymentProps,
    operatorId: string
  ): Promise<void> {
    const cashRegister =
      await this.cashRegisterRepository.findActiveRegister(operatorId)

    if (cashRegister) {
      cashRegister.deposit({ amount, type })
      await this.cashRegisterRepository.save(cashRegister)
    }
  }
}
