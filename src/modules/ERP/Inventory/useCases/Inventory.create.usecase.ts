import { Inventory } from '../Inventory'
import { makeInventory } from '../Inventory.factory'
import { InventoryRepository } from '../Inventory.repository'

export class CreateInventoryUseCase {
  constructor(private inventoryRepository: InventoryRepository) {}

  async execute(): Promise<Inventory | null> {
    const inventory: Inventory = makeInventory({})

    await this.inventoryRepository.save(inventory)

    return inventory
  }
}
