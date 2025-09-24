import { Injectable } from '@nestjs/common'
import { Sale } from '../Sale'
import { SaleRepository } from '../Sale.repository'
import { Barcode } from 'src/modules/ERP/Barcode/Barcode'

@Injectable()
export class RemoveItemFromSaleUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async execute(saleId: string, productBarcode: Barcode): Promise<Sale> {
    const sale = await this.saleRepository.findById(saleId)
    if (!sale) {
      throw new Error('Sale not found.')
    }

    sale.removeBarcode(productBarcode)

    await this.saleRepository.save(sale)
    return sale
  }
}
