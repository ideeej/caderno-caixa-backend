import { Barcode, generateValidEAN13 } from '../../Barcode/Barcode'
import { Inventory } from '../Inventory'
import { makeInventory } from '../Inventory.factory'
import { FakeInventoryRepository } from '../Inventory.repository'
import { SaleInventoryUseCase } from './Inventory.sale.usecase'

describe('Inventory Sale  Usecase', () => {
  let saleInventory: SaleInventoryUseCase
  let fakeRepository: FakeInventoryRepository

  beforeEach(() => {
    fakeRepository = new FakeInventoryRepository()
    saleInventory = new SaleInventoryUseCase(fakeRepository)
  })

  test('should perform the sale of a product from the inventory', async () => {
    const inventory: Inventory | null = makeInventory({})
    const productBarcode: Barcode = generateValidEAN13()

    inventory.performEntry(productBarcode, 20)

    await fakeRepository.save(inventory)

    const updatedInventory: Inventory | null = await saleInventory.execute(
      inventory.id,
      productBarcode,
      15
    )

    const addedItem = updatedInventory?.findByBarcode(productBarcode)
    expect(updatedInventory?.items.size).toBe(1)
    expect(updatedInventory?.operations.length).toBe(2)
    expect(addedItem).toBeDefined()
    expect(addedItem?.productBarcode).toBe(productBarcode)
    expect(addedItem?.quantity).toBe(5)
  })

  test('Should add items and not duplicate', async () => {
    const inventory: Inventory | null = makeInventory({})
    const productBarcode: Barcode = generateValidEAN13()

    inventory.performEntry(productBarcode, 30)

    await fakeRepository.save(inventory)
    await saleInventory.execute(inventory.id, productBarcode, 5)

    const updatedInventory: Inventory | null = await saleInventory.execute(
      inventory.id,
      productBarcode,
      15
    )

    const addedItem = updatedInventory?.findByBarcode(productBarcode)
    expect(updatedInventory?.items.size).toBe(1)
    expect(updatedInventory?.operations.length).toBe(3)
    expect(addedItem).toBeDefined()
    expect(addedItem?.productBarcode).toBe(productBarcode)
    expect(addedItem?.quantity).toBe(10)
  })
})
