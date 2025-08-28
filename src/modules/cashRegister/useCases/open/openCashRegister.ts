import { Injectable } from '@nestjs/common'
import { CashRegisterRepository } from '../../repositories/cashRegisterRepository'
import { CashRegister, CashRegisterState } from '../../entities/CashRegister'
import { FakeCashRegisterRepository } from '../../repositories/fakeCashRegisterRepository'

interface OpenCashRegisterRequest {
  amount: number
  operatorId: string
}

@Injectable()
export class OpenCashRegister {
  constructor(private cashRegisterRepository: CashRegisterRepository) {}

  async execute({
    amount,
    operatorId,
  }: OpenCashRegisterRequest): Promise<CashRegister> {
    const hasActiveRegister =
      await this.cashRegisterRepository.findActiveRegister(operatorId)

    if (hasActiveRegister) {
      throw new Error(
        '[USECASE] OpenCashRegister: It seems like there is an open cash register for this user.'
      )
    }

    if (amount < 0) {
      throw new Error(
        '[USECASE] OpenCashRegister: The initial quantity for the cash register cannot be negative.'
      )
    }

    if (!operatorId || operatorId.trim() === '') {
      throw new Error(
        '[USECASE] OpenCashRegister: The operatorId cannot be empty.'
      )
    }

    const cashRegister = new CashRegister({
      operatorId,
      balance: { cash: amount },
      openedAt: new Date(),
      state: CashRegisterState.OPEN,
      closedAt: null,
      declaredCashClose: null,
    })

    return await this.cashRegisterRepository.save(cashRegister)
  }
}
