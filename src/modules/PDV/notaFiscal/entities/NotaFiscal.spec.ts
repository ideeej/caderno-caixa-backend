import Decimal from 'decimal.js'
import { makeInvoice } from '../factories/NotaFiscalFactory'
import { makeInvoiceItem } from '../factories/NotaFiscalItemFactory'
import { makeProductItem } from '../factories/productFactory'
import { InvoiceState } from './NotaFiscal'

describe('Invoice Entity', () => {
  describe('Core', () => {
    it('Should create an empty Invoice', () => {
      const testInvoice = makeInvoice({})

      expect(testInvoice.payments).toEqual([])
      expect(testInvoice.items).toEqual([])
      expect(testInvoice.state).toBe(InvoiceState.OPEN)
      expect(testInvoice.closedAt).toBeNull()
    })

    it('Should be able to receive items and store them', () => {
      const testInvoice = makeInvoice({})
      const testItem = makeInvoiceItem({}) // product is not relevant here

      testInvoice.addItem(testItem)

      expect(testInvoice.items[0]).toEqual(testItem)
    })

    it('Should be able to remove an item by index', () => {
      const testInvoice = makeInvoice({})
      const testItem = makeInvoiceItem({})

      testInvoice.addItem(testItem)
      testInvoice.removeByIndex(0)

      expect(testInvoice.items).toEqual([])
    })

    it('Should be able to remove an item by id', () => {
      const testInvoice = makeInvoice({})
      const testItem = makeInvoiceItem({})

      testInvoice.addItem(testItem)
      testInvoice.removeById(testItem.id)

      expect(testInvoice.items).toEqual([])
    })

    it('Should be able to remove an array of item ids', () => {
      const testInvoice = makeInvoice({})

      const test_ids = ['test1', 'test2', 'test3', 'test4', 'test5', 'test6']
      const ids_to_remove = ['test2', 'test5', 'test3']
      const test_items = test_ids.map(id => makeInvoiceItem({}, id))

      test_items.forEach(item => {
        testInvoice.addItem(item)
      })

      testInvoice.removeItemsByIds(ids_to_remove)

      const idsInTestInvoice = testInvoice.items.map(item => item.id)

      expect(idsInTestInvoice).toEqual(['test1', 'test4', 'test6'])
    })

    it('Subtotal should be zero on an Empty Invoice', () => {
      const testInvoice = makeInvoice({})

      expect(testInvoice.subtotal).toEqual(Decimal('0'))
    })

    it('Subtotal should be calculated correctly', () => {
      const testInvoice = makeInvoice({})

      const testProduct = makeProductItem({ price: Decimal('2.99') })
      const testProduct2 = makeProductItem({ price: Decimal('2.99') })

      const testItem = makeInvoiceItem({ product: testProduct })
      const testItem2 = makeInvoiceItem({ product: testProduct2 })

      testInvoice.addItem(testItem)
      testInvoice.addItem(testItem2)

      expect(testInvoice.subtotal).toEqual(
        testProduct.price.plus(testProduct2.price)
      )
    })
  })
})
