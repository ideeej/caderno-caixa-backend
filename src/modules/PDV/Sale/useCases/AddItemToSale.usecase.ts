import { Injectable } from '@nestjs/common'
import { Sale } from '../Sale'
import { SaleRepository } from '../Sale.repository'
import { Product } from 'src/modules/ERP/Product/Product'

@Injectable()
export class AddItemToSaleUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async execute(
    saleId: string,
    product: Product,
    quantity: number
  ): Promise<Sale> {
    const sale = await this.saleRepository.findById(saleId)
    if (!sale) {
      throw new Error('Sale not found.')
    }

    sale.addItem(product, quantity)

    await this.saleRepository.save(sale)
    return sale
  }
}
