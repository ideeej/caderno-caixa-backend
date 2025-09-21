import { Injectable } from '@nestjs/common'
import { Sale, SaleState } from '../Sale'
import { SaleRepository } from '../Sale.repository'
import { ICustomer } from 'src/utils/ICustomer'

@Injectable()
export class CreateSaleUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async execute(): Promise<Sale> {
    // Precisamos associar um Operator e um CashRegister e um Customer
    const sale = new Sale({
      items: [],
      state: SaleState.CREATED,
      payments: [],
      openedAt: new Date(),
      closedAt: null,
      cancelledAt: null,
      finishedAt: null,
    })

    await this.saleRepository.save(sale) // Salva a venda no "banco de dados"
    return sale
  }
}
