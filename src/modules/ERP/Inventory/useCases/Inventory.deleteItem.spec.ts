import { Barcode, generateValidEAN13 } from '../../Barcode/Barcode'
import { Inventory } from '../Inventory'
import { makeInventory } from '../Inventory.factory'
import { FakeInventoryRepository } from '../Inventory.repository'
import { DeleteItemInventoryUseCase } from './Inventory.deleteItem.usecase'

describe('Inventory Sale  Usecase', () => {
  let deleteItemInventory: DeleteItemInventoryUseCase
  let fakeRepository: FakeInventoryRepository

  beforeEach(() => {
    fakeRepository = new FakeInventoryRepository()
    deleteItemInventory = new DeleteItemInventoryUseCase(fakeRepository)
  })

  test('should perform the sale of a product from the inventory', async () => {
    const inventory: Inventory | null = makeInventory({})
    const productBarcode: Barcode = generateValidEAN13()

    inventory.performEntry(productBarcode, 20)

    await fakeRepository.save(inventory)

    const updatedInventory: Inventory | null =
      await deleteItemInventory.execute(inventory.id, productBarcode)
    expect(updatedInventory?.items.size).toBe(0)
  })
})
