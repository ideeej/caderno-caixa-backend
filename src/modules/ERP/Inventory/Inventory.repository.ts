import { IRepository } from 'src/utils/IRepository'
import { Inventory } from './Inventory'

export abstract class InventoryRepository implements IRepository<Inventory> {
  abstract findById(id: string): Promise<Inventory | null>
  abstract save(inventory: Inventory): Promise<void>
  abstract delete(id: string): Promise<void>
}

export class FakeInventoryRepository implements InventoryRepository {
  public inventories: Inventory[] = []

  async findById(id: string): Promise<Inventory | null> {
    const inventory = this.inventories.find(s => s.id === id)
    return inventory || null
  }

  async save(inventory: Inventory): Promise<void> {
    const index = this.inventories.findIndex(s => s.id === inventory.id)

    if (index >= 0) {
      this.inventories[index] = inventory // Atualiza o produto
    } else {
      this.inventories.push(inventory) // Adiciona novo produto
    }
  }

  async delete(id: string): Promise<void> {
    this.inventories = this.inventories.filter(s => s.id !== id)
  }
}
