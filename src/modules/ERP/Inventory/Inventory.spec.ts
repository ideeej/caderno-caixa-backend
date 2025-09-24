import { Inventory } from './Inventory'
import { InventoryItem } from './InventoryItem'
import { OperationType } from './InventoryOperation'
import { Barcode, generateValidEAN13 } from '../Barcode/Barcode'
import { makeInventory } from './Inventory.factory'

describe('Domain Inventory', () => {
  let inventory: Inventory
  let product1Barcode: Barcode
  let product2Barcode: Barcode

  beforeEach(() => {
    inventory = makeInventory({
      items: new Map<string, InventoryItem>(),
      barcodeIndex: new Map<string, string>(),
      operations: [],
    })

    product1Barcode = generateValidEAN13()
    product2Barcode = generateValidEAN13()
  })

  test('Create an empty inventory', () => {
    expect(inventory.items).toEqual(new Map<string, InventoryItem>())
    expect(inventory.barcodeIndex).toEqual(new Map<string, string>())
  })

  test('performEntry should add a new InventoryItem, update maps, and register an ENTRADA operation', () => {
    inventory.performEntry(product1Barcode, 5)

    const itemInQuestion = inventory.findByBarcode(product1Barcode)
    expect(itemInQuestion).toBeDefined()
    expect(itemInQuestion!.productBarcode).toEqual(product1Barcode)
    expect(itemInQuestion!.quantity).toBe(5)

    const itemId = inventory.barcodeIndex.get(product1Barcode.value)
    expect(itemId).toBeDefined()
    expect(inventory.items.get(itemId!)).toBe(itemInQuestion)

    expect(inventory.operations.length).toBe(1)
    expect(inventory.operations[0].type).toBe(OperationType.ENTRADA)
    expect(inventory.operations[0].productId).toBe(product1Barcode.value)
    expect(inventory.operations[0].quantity).toBe(5)
  })

  test('performEntry should add quantities when item already exists', () => {
    inventory.performEntry(product1Barcode, 5)
    inventory.performEntry(product1Barcode, 10)

    const addedItem = inventory.findByBarcode(product1Barcode)
    expect(addedItem!.quantity).toBe(15)

    expect(inventory.items.size).toBe(1)

    expect(inventory.operations.length).toBe(2)
  })
})
