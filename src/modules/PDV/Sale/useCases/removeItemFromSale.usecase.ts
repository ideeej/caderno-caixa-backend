import { Injectable } from '@nestjs/common'
import { Sale } from '../Sale'
import { SaleRepository } from '../Sale.repository'

@Injectable()
export class RemoveItemFromSaleUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async execute(itemId: string, saleId: string): Promise<Sale> {
    // Precisamos associar um Operator e um CashRegister e um Customer
    const sale = await this.saleRepository.findById(saleId)
    if (!sale) {
      throw new Error('Sale not found.')
    }

    sale.removeById(itemId)

    await this.saleRepository.save(sale) // Salva a venda no "banco de dados"
    return sale
  }
}
