import { Inventory } from '../Inventory'
import { makeInventory } from '../Inventory.factory'
import { FakeInventoryRepository } from '../Inventory.repository'
import { EntryInventoryUseCase } from './Inventory.entry.usecase'

import { Barcode, generateValidEAN13 } from '../../Barcode/Barcode'

describe('Inventory entry  Usecase', () => {
  let entryInventory: EntryInventoryUseCase
  let fakeRepository: FakeInventoryRepository

  beforeEach(() => {
    fakeRepository = new FakeInventoryRepository()
    entryInventory = new EntryInventoryUseCase(fakeRepository)
  })

  test('should perform entry of a product into the inventory', async () => {
    const inventory: Inventory | null = makeInventory({})
    const productBarcode: Barcode = generateValidEAN13('')

    await fakeRepository.save(inventory)

    const updatedInventory: Inventory | null = await entryInventory.execute(
      inventory.id,
      productBarcode,
      15
    )

    const addedItem = updatedInventory?.findByBarcode(productBarcode)
    expect(updatedInventory?.items.size).toBe(1)
    expect(addedItem).toBeDefined()
    expect(addedItem?.productBarcode).toBe(productBarcode)
    expect(addedItem?.quantity).toBe(15)
  })

  test('Should add items and not duplicate', async () => {
    const inventory: Inventory | null = makeInventory({})
    const productBarcode: Barcode = generateValidEAN13('')

    await fakeRepository.save(inventory)
    await entryInventory.execute(inventory.id, productBarcode, 5)

    const updatedInventory: Inventory | null = await entryInventory.execute(
      inventory.id,
      productBarcode,
      15
    )

    const addedItem = updatedInventory?.findByBarcode(productBarcode)
    expect(updatedInventory?.items.size).toBe(1)
    expect(addedItem).toBeDefined()
    expect(addedItem?.productBarcode).toBe(productBarcode)
    expect(addedItem?.quantity).toBe(20)
  })
})
