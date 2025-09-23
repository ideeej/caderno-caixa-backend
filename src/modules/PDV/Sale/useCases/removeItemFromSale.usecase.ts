import { Injectable } from '@nestjs/common'
import { Sale } from '../Sale'
import { SaleRepository } from '../Sale.repository'

@Injectable()
export class RemoveItemFromSaleUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async execute(itemId: string, saleId: string): Promise<Sale> {
    const sale = await this.saleRepository.findById(saleId)
    if (!sale) {
      throw new Error('Sale not found.')
    }

    sale.removeById(itemId)

    await this.saleRepository.save(sale)
    return sale
  }
}
