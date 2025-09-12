import Decimal from 'decimal.js'
import { PricingType } from 'src/utils/pricingType'
import { MeasuringUnit } from 'src/utils/measuringUnit'
import { InventoryItem, inventoryItemProps } from './inventoryItem'
import { makeProduct } from '../product/productFactory'
import { makeInventory } from './inventory.factory'
import { makeInventoryItem } from './inventoryItem.factory'

// Concrete class dependencies
import { Inventory } from './inventory'
import { Product, ProductProps } from '../product/product'
import { InventoryOperation } from './InventoryOperation'

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

    test('RemoveItem should remove an item from the inventory', () => {
      const product: Product = makeProduct({
        barcode: '789490001160',
        name: 'Coca cola pet',
        description: 'Edited.',
        price: Decimal('6.99'),
        measuringUnit: MeasuringUnit.mililiter('600'),
        pricingType: PricingType.UNITARY,
      })

      const item = makeInventoryItem({
        productId: product.id,
        product,
        quantity: 12,
      })

      inventory.addItems(item)
      inventory.removeItems(product.id, item.quantity)
      expect(inventory.getItemById(product.id)).toBeNull()
      expect(inventory.operationHistory.length).toBe(2)
    })
    test('RemoveItem should decrease quantity when removing less than stock', () => {
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

    test('RemoveItem should throw error if removing more than stock', () => {
      const product = makeProduct({
        barcode: '7894900010039',
        name: 'Fanta lata',
        description: '',
        price: Decimal('3.29'),
        measuringUnit: MeasuringUnit.mililiter('350'),
        pricingType: PricingType.UNITARY,
      })

      const item = makeInventoryItem({
        productId: product.id,
        product,
        quantity: 5,
      })

      inventory.addItems(item)
      expect(() => inventory.removeItems(product.id, 10)).toThrow(
        'Não temos produto suficiente em estoque.'
      )
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
