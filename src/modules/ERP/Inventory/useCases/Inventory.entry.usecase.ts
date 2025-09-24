import { Barcode } from '../../Barcode/Barcode'
import { Inventory } from '../Inventory'
import { InventoryRepository } from '../Inventory.repository'

export class EntryInventoryUseCase {
  constructor(private inventoryRepository: InventoryRepository) {}

  async execute(
    inventoryId: string,
    productBarcode: Barcode,
    quantity: number
  ): Promise<Inventory | null> {
    const inventory: Inventory | null =
      await this.inventoryRepository.findById(inventoryId)

    if (!inventory) {
      throw new Error('Inventário não encontrado')
    }

    inventory.performEntry(productBarcode, quantity)

    await this.inventoryRepository.save(inventory)

    return inventory
  }
}
