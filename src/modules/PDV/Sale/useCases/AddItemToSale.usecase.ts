import { Injectable } from '@nestjs/common'
import { Sale } from '../Sale'
import { SaleRepository } from '../Sale.repository'
import { SaleItem } from '../SaleItem'

@Injectable()
export class AddItemToSaleUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async execute(item: SaleItem, saleId: string): Promise<Sale> {
    // Precisamos associar um Operator e um CashRegister e um Customer
    const sale = await this.saleRepository.findById(saleId)
    if (!sale) {
      throw new Error('Sale not found.')
    }

    sale.addItem(item)

    await this.saleRepository.save(sale) // Salva a venda no "banco de dados"
    return sale
  }
}
