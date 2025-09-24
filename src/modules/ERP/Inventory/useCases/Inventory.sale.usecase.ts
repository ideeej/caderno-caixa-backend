import { Sale } from 'src/modules/PDV/Sale/Sale'
import { Inventory } from '../Inventory'
import { InventoryRepository } from '../Inventory.repository'

export class SaleInventoryUseCase {
  constructor(private inventoryRepository: InventoryRepository) {}

  async execute(inventoryId: string, sale: Sale): Promise<Inventory | null> {
    const inventory: Inventory | null =
      await this.inventoryRepository.findById(inventoryId)

    if (!inventory) {
      throw new Error('Inventário não encontrado')
    }

    inventory.performSale(sale)

    await this.inventoryRepository.save(inventory)

    return inventory
  }
}
