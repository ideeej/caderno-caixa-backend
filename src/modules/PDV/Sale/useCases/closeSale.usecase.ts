import { Injectable } from '@nestjs/common'
import { Sale } from '../Sale'
import { SaleRepository } from '../Sale.repository'
import { InventoryRepository } from 'src/modules/ERP/Inventory/Inventory.repository'

@Injectable()
export class CloseSaleUseCase {
  constructor(
    private saleRepository: SaleRepository,
    private inventoryRepository: InventoryRepository
  ) {}

  async execute(saleId: string): Promise<Sale> {
    const sale = await this.saleRepository.findById(saleId)

    if (!sale) {
      throw new Error('Sale não encontrada')
    }

    sale.close()

    const inventory = await this.inventoryRepository.findById(sale.inventory.id)

    if (!inventory) {
      throw new Error(
        'Não foi possível fechar a venda pois não há inventário associado.'
      )
    }

    inventory.performSale(sale)

    await this.inventoryRepository.save(inventory)
    await this.saleRepository.save(sale)
    return sale
  }
}
