import Decimal from 'decimal.js'
import { makeProduct } from '../product/productFactory'
import { makeInventory } from './inventory.factory'
import { inventoryItemProps } from './inventoryItem'
import { MeasuringUnit } from 'src/utils/measuringUnit'
import { PricingType } from 'src/utils/pricingType'
import { makeInventoryItem } from './inventoryItem.factory'
import { ProductProps } from '../product/product'
import { Inventory } from './inventory'

describe('Domain Inventory', () => {
  describe('Core', () => {
    let inventory: Inventory
    beforeEach(() => {
      inventory = makeInventory({})
    })
    test('Create an empty inventory', () => {
      expect(inventory.items).toEqual(new Map<string, inventoryItemProps>())
    })

    test('getItem should retrieve an item by barcode', () => {
      const product: ProductProps = {
        barcode: '7894900010015',
        name: 'Coca cola lata',
        description: '',
        price: Decimal('3.49'),
        measuringUnit: MeasuringUnit.mililiter('350'),
        pricingType: PricingType.UNITARY,
      }

      const item = makeInventoryItem({
        product,
        quantity: 6,
      })

      inventory.addItem(item)
      expect(inventory.getItem(product.barcode)!.product).toEqual(product)
      expect(inventory.getItem(product.barcode)!.quantity).toEqual(6)
    })

    test('Additem should add InventoryItems correctly', () => {
      const product = {
        barcode: '7894900010015',
        name: 'Coca cola lata',
        description: '',
        price: Decimal('3.49'),
        measuringUnit: MeasuringUnit.mililiter('350'),
        pricingType: PricingType.UNITARY,
      }

      const testInventoryItem = makeInventoryItem({
        product,
        quantity: 5,
      })

      inventory.addItem(testInventoryItem)

      const itemInQuestion = inventory.getItem(product.barcode)
      expect(itemInQuestion!.product).toEqual(product)
      expect(itemInQuestion!.quantity).toBe(5)
    })

    test('AddItem should add quantities when item exists', () => {
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
          product: products[0],
          quantity: 5,
        }),
        makeInventoryItem({
          product: products[0],
          quantity: 10,
        }),
      ]

      items.forEach(item => {
        inventory.addItem(item)
      })

      const addedItem = inventory.getItem(products[0].barcode)
      expect(addedItem!.quantity).toBe(15)
    })
    // get, edit, delete

    test('editItem should edit an item', () => {
      const products: ProductProps[] = [
        {
          barcode: '7894900010015',
          name: 'Coca cola lata',
          description: '',
          price: Decimal('3.49'),
          measuringUnit: MeasuringUnit.mililiter('350'),
          pricingType: PricingType.UNITARY,
        },
        {
          barcode: '789490001160',
          name: 'Coca cola pet',
          description: 'Edited.',
          price: Decimal('6.99'),
          measuringUnit: MeasuringUnit.mililiter('600'),
          pricingType: PricingType.UNITARY,
        },
      ]

      const originalItem = makeInventoryItem({
        product: products[0],
        quantity: 6,
      })

      const editedItem = makeInventoryItem({
        product: products[1],
        quantity: 12,
      })

      inventory.addItem(originalItem)
      inventory.editItem(originalItem, editedItem)

      const oldItem = inventory.getItem(originalItem.product.barcode)
      const checkItem = inventory.getItem(editedItem.product.barcode)

      expect(oldItem).toBeNull()
      expect(checkItem!.product).toEqual(editedItem.product)
      expect(checkItem!.quantity).toBe(12)
    })

    test('deleteItem should remove an item from the inventory', () => {
      const product: ProductProps = {
        barcode: '789490001160',
        name: 'Coca cola pet',
        description: 'Edited.',
        price: Decimal('6.99'),
        measuringUnit: MeasuringUnit.mililiter('600'),
        pricingType: PricingType.UNITARY,
      }

      const item = makeInventoryItem({
        product,
        quantity: 12,
      })

      inventory.addItem(item)
      const addedItem = inventory.getItem(item.product.barcode)
      expect(addedItem).toEqual(item)

      inventory.deleteItem(item)

      const deletedItem = inventory.getItem(item.product.barcode)
      expect(deletedItem).toBeNull()
    })
  })
})
