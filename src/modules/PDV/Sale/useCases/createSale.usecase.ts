import { Injectable } from '@nestjs/common'
import { Sale, SaleState } from '../Sale'
import { SaleRepository } from '../Sale.repository'

@Injectable()
export class CreateSaleUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async execute(): Promise<Sale> {
    const sale = new Sale({
      items: [],
      state: SaleState.CREATED,
      payments: [],
      openedAt: new Date(),
      closedAt: null,
      cancelledAt: null,
      finishedAt: null,
    })

    await this.saleRepository.save(sale)
    return sale
  }
}
