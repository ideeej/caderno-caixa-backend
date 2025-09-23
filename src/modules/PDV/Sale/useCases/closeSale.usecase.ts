import { Injectable } from '@nestjs/common'
import { Sale } from '../Sale'
import { SaleRepository } from '../Sale.repository'

@Injectable()
export class CloseSaleUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async execute(saleId: string): Promise<Sale> {
    const sale = await this.saleRepository.findById(saleId)

    if (!sale) {
      throw new Error('Sale não encontrada')
    }

    sale.close()

    return sale
  }
}
