import { Inventory } from '../Inventory'
import { makeInventory } from '../Inventory.factory'
import { InventoryRepository } from '../Inventory.repository'

export class CreateInventoryUseCase {
  constructor(private inventoryRepository: InventoryRepository) {}

  async execute(inventoryId?: string): Promise<Inventory | null> {
    const inventory: Inventory = makeInventory({}, inventoryId)

    await this.inventoryRepository.save(inventory)

    return inventory
  }
}
