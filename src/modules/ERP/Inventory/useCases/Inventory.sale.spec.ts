import { makeSale } from 'src/modules/PDV/Sale/Sale.factory'
import { Inventory } from '../Inventory'
import { makeInventory } from '../Inventory.factory'
import { FakeInventoryRepository } from '../Inventory.repository'
import { SaleInventoryUseCase } from './Inventory.sale.usecase'
import { makeProduct } from '../../Product/Product.factory'

describe('Inventory Sale  Usecase', () => {
  let saleInventory: SaleInventoryUseCase
  let fakeRepository: FakeInventoryRepository

  beforeEach(() => {
    fakeRepository = new FakeInventoryRepository()
    saleInventory = new SaleInventoryUseCase(fakeRepository)
  })

  test('should perform the sale and update the inventory', async () => {
    const inventory: Inventory | null = makeInventory({})
    const sale = makeSale({})
    const product = makeProduct({})

    sale.addItem(product, 5)

    inventory.performEntry(product.barcode, 20)

    await fakeRepository.save(inventory)

    const updatedInventory: Inventory | null = await saleInventory.execute(
      inventory.id,
      sale
    )

    const inventoryItem = updatedInventory?.findByBarcode(product.barcode)

    expect(updatedInventory?.items.size).toBe(1)
    expect(updatedInventory?.operations.length).toBe(2)
    expect(inventoryItem).toBeDefined()
    expect(inventoryItem?.productBarcode).toBe(product.barcode)
    expect(inventoryItem?.quantity).toBe(15)
  })

  test('Should add items and not duplicate', async () => {
    const inventory: Inventory | null = makeInventory({})
    const sale = makeSale({})
    const product = makeProduct({})

    sale.addItem(product, 5)

    inventory.performEntry(product.barcode, 30)

    await fakeRepository.save(inventory)
    await saleInventory.execute(inventory.id, sale)

    const updatedInventory: Inventory | null = await saleInventory.execute(
      inventory.id,
      sale
    )

    const inventoryItem = updatedInventory?.findByBarcode(product.barcode)
    expect(updatedInventory?.items.size).toBe(1)
    expect(updatedInventory?.operations.length).toBe(3)
    expect(inventoryItem).toBeDefined()
    expect(inventoryItem?.productBarcode).toBe(product.barcode)
    expect(inventoryItem?.quantity).toBe(20)
  })
})
