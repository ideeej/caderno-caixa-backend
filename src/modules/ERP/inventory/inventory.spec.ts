import Decimal from 'decimal.js'
import { PricingType } from 'src/utils/pricingType'
import { MeasuringUnit } from 'src/utils/measuringUnit'
import { InventoryItem } from './inventoryItem'
import { makeProduct } from '../product/productFactory'
import { makeInventory } from './inventory.factory'
import { makeInventoryItem } from './inventoryItem.factory'

// Concrete class dependencies
import { Inventory } from './inventory'
import { Product } from '../product/product'
import { InventoryOperation, OperationType } from './InventoryOperation'

describe('Domain Inventory', () => {
  describe('Core', () => {
    let inventory: Inventory
    beforeEach(() => {
      inventory = makeInventory({})
    })

    test('Create an empty inventory', () => {
      expect(inventory.items).toEqual(new Map<string, InventoryItem>())
    })

    test('Additem should add InventoryItems correctly', () => {
      const product = makeProduct({
        barcode: '7894900010015',
        name: 'Coca cola lata',
        description: '',
        price: Decimal('3.49'),
        measuringUnit: MeasuringUnit.mililiter('350'),
        pricingType: PricingType.UNITARY,
      })

      const testInventoryItem = makeInventoryItem({
        productId: product.id,
        product: product.toProps(),
        quantity: 5,
      })

      inventory.addItems(testInventoryItem)

      const itemInQuestion = inventory.getItemById(product.id)
      expect(itemInQuestion!.product).toEqual(product.toProps())
      expect(itemInQuestion!.quantity).toBe(5)
    })

    test('Additem should create an InventoryOperation of type ENTRADA', () => {
      const product = makeProduct({
        barcode: '7894900010015',
        name: 'Coca cola lata',
        description: '',
        price: Decimal('3.49'),
        measuringUnit: MeasuringUnit.mililiter('350'),
        pricingType: PricingType.UNITARY,
      })

      const testInventoryItem = makeInventoryItem({
        productId: product.id,
        product,
        quantity: 5,
      })

      inventory.addItems(testInventoryItem)

      expect(inventory.operationHistory.length).toBe(1)
      expect(inventory.operationHistory[0]).toBeInstanceOf(InventoryOperation)
      expect(inventory.operationHistory[0].productId).toBe(product.id)
      expect(inventory.operationHistory[0].quantity).toBe(
        testInventoryItem.quantity
      )
    })

    test('AddItem should add quantities when item exist', () => {
      const products = [
        makeProduct({
          barcode: '7894900010015',
          name: 'Coca cola lata',
          description: '',
          price: Decimal('3.49'),
          measuringUnit: MeasuringUnit.mililiter('350'),
          pricingType: PricingType.UNITARY,
        }),
      ]

      const items = [
        makeInventoryItem({
          productId: products[0].id,
          product: products[0],
          quantity: 5,
        }),
        makeInventoryItem({
          productId: products[0].id,
          product: products[0],
          quantity: 10,
        }),
      ]

      items.forEach(item => {
        inventory.addItems(item)
      })

      const addedItem = inventory.getItemById(products[0].id)
      expect(addedItem!.quantity).toBe(15)
    })

    test("RemoveItem should create InventoryOperations of the correct type", () => {
      const product = makeProduct({
        barcode: '7894900010039',
        name: 'Fanta lata',
        description: '',
        price: Decimal('3.29'),
        measuringUnit: MeasuringUnit.mililiter('350'),
        pricingType: PricingType.UNITARY,
      })

      const itemToAdd = makeInventoryItem({
        productId: product.id,
        product,
        quantity: 5,
      })

      inventory.addItems(itemToAdd)
      inventory.addItems(itemToAdd)
      inventory.removeItems(product.id, 5)
      inventory.removeItems(product.id, 5, OperationType.CONSUMO)

      expect(inventory.operationHistory.length).toBe(4)
      expect(inventory.operationHistory[0].type).toBe(OperationType.ENTRADA)
      expect(inventory.operationHistory[1].type).toBe(OperationType.ENTRADA)
      expect(inventory.operationHistory[2].type).toBe(OperationType.SAIDA)
      expect(inventory.operationHistory[3].type).toBe(OperationType.CONSUMO)


    })

    test('RemoveItem should decrease quantity', () => {
      const product = makeProduct({
        barcode: '7894900010022',
        name: 'Guaraná lata',
        description: '',
        price: Decimal('3.19'),
        measuringUnit: MeasuringUnit.mililiter('350'),
        pricingType: PricingType.UNITARY,
      })

      const item = makeInventoryItem({
        productId: product.id,
        product,
        quantity: 10,
      })

      inventory.addItems(item)
      inventory.removeItems(product.id, 4)

      const updatedItem = inventory.getItemById(product.id)
      expect(updatedItem).not.toBeNull()
      expect(updatedItem!.quantity).toBe(6)
    })

    test('AddItem should throw error if quantity is zero or negative', () => {
      const product = makeProduct({
        barcode: '7894900010046',
        name: 'Sprite lata',
        description: '',
        price: Decimal('3.39'),
        measuringUnit: MeasuringUnit.mililiter('350'),
        pricingType: PricingType.UNITARY,
      })

      const zeroItem = makeInventoryItem({
        productId: product.id,
        product,
        quantity: 0,
      })

      const negativeItem = makeInventoryItem({
        productId: product.id,
        product,
        quantity: -5,
      })

      expect(() => inventory.addItems(zeroItem)).toThrow(
        'A quantidade a ser adicionada deve ser maior que zero.'
      )
      expect(() => inventory.addItems(negativeItem)).toThrow(
        'A quantidade a ser adicionada deve ser maior que zero.'
      )
    })
  })
})
