import { Barcode } from '../../Barcode/Barcode'
import { Inventory } from '../Inventory'
import { InventoryRepository } from '../Inventory.repository'

export class DeleteItemInventoryUseCase {
  constructor(private inventoryRepository: InventoryRepository) {}

  async execute(
    inventoryId: string,
    barcode: Barcode
  ): Promise<Inventory | null> {
    const inventory: Inventory | null =
      await this.inventoryRepository.findById(inventoryId)

    if (!inventory) {
      throw new Error('Inventário não encontrado')
    }

    inventory.deleteItem(barcode)

    await this.inventoryRepository.save(inventory)

    return inventory
  }
}
