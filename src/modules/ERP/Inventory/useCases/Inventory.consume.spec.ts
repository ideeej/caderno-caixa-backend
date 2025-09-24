import { Barcode, generateValidEAN13 } from '../../Barcode/Barcode'
import { Inventory } from '../Inventory'
import { makeInventory } from '../Inventory.factory'
import { FakeInventoryRepository } from '../Inventory.repository'
import { ConsumeInventoryUseCase } from './Inventory.consume.usecase'

describe('Inventory Sale  Usecase', () => {
  let consumeInventory: ConsumeInventoryUseCase
  let fakeRepository: FakeInventoryRepository

  beforeEach(() => {
    fakeRepository = new FakeInventoryRepository()
    consumeInventory = new ConsumeInventoryUseCase(fakeRepository)
  })

  test('should perform the consumption of a product into the inventory', async () => {
    const inventory: Inventory | null = makeInventory({})
    const productBarcode: Barcode = generateValidEAN13()

    inventory.performEntry(productBarcode, 21)
    await fakeRepository.save(inventory)

    const updatedInventory: Inventory | null = await consumeInventory.execute(
      inventory.id,
      productBarcode,
      15
    )

    const addedItem = updatedInventory?.findByBarcode(productBarcode)
    expect(updatedInventory?.items.size).toBe(1)
    expect(updatedInventory?.operations.length).toBe(2)
    expect(addedItem).toBeDefined()
    expect(addedItem?.productBarcode).toBe(productBarcode)
    expect(addedItem?.quantity).toBe(6)
  })

  test('Should remove items and not duplicate', async () => {
    const inventory: Inventory | null = makeInventory({})
    const productBarcode: Barcode = generateValidEAN13()

    inventory.performEntry(productBarcode, 53)
    await fakeRepository.save(inventory)
    await consumeInventory.execute(inventory.id, productBarcode, 5)

    const updatedInventory: Inventory | null = await consumeInventory.execute(
      inventory.id,
      productBarcode,
      15
    )

    const addedItem = updatedInventory?.findByBarcode(productBarcode)
    expect(updatedInventory?.items.size).toBe(1)
    expect(updatedInventory?.operations.length).toBe(3)
    expect(addedItem).toBeDefined()
    expect(addedItem?.productBarcode).toBe(productBarcode)
    expect(addedItem?.quantity).toBe(33)
  })
})
