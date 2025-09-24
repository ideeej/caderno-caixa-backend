import { Inventory } from '../Inventory'
import { FakeInventoryRepository } from '../Inventory.repository'
import { CreateInventoryUseCase } from './Inventory.create.usecase'

describe('Inventory create  Usecase', () => {
  let createInventory: CreateInventoryUseCase
  let fakeRepository: FakeInventoryRepository

  beforeEach(() => {
    fakeRepository = new FakeInventoryRepository()
    createInventory = new CreateInventoryUseCase(fakeRepository)
  })

  test('should create an empty Inventory and save it on the repository', async () => {
    const inventory: Inventory | null = await createInventory.execute()

    if (!inventory) {
      throw new Error('Inventory was not created')
    }

    expect(inventory).not.toBeNull()
    if (inventory) {
      expect(inventory).toBeInstanceOf(Inventory)
      expect(inventory.items.size).toBe(0)
    }
  })
})
