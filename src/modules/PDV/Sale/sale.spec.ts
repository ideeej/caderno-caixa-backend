import Decimal from 'decimal.js'
import { makeSale } from './sale.factory'
import { SaleState } from './sale'
import { makeProduct } from 'src/modules/ERP/product/productFactory'
import { makeSaleItem } from './saleItem.factory'

describe('SALE TESTS', () => {
  let sale
  beforeEach(() => {
    sale = makeSale({})
  })

  test('SALE Test Creation', () => {
    expect(sale.items).toEqual([])
    expect(sale.state).toBe(SaleState.CREATED)
    expect(sale.total).toEqual(Decimal('0'))
    expect(sale.closedAt).toBeNull()
    expect(sale.cancelledAt).toBeNull()
    expect(sale.finishedAt).toBeNull()
  })

  describe('Items', () => {
    test('AddItem should add an item to items and update total', () => {
      const product = makeProduct({ price: Decimal('10.58') })
      const testItem = makeSaleItem({ productInfo: product })

      expect(sale.state).toBe(SaleState.CREATED)
      sale.addItem(testItem)
      expect(sale.state).toBe(SaleState.OPEN)

      expect(sale.items[0]).toEqual(testItem)
      expect(sale.total).toEqual(Decimal('10.58'))
    })

    test('RemoveByIndex should remove an item from items by index and update total', () => {
      const produtoTest = makeProduct({ price: Decimal('10.58') })
      const testItem = makeSaleItem({ productInfo: produtoTest })

      sale.addItem(testItem)
      expect(sale.total).toEqual(Decimal('10.58'))
      sale.removeByIndex(0)

      expect(sale.items).toEqual([])
      expect(sale.total).toEqual(Decimal('0'))
    })

    test('RemoveById should remove an item from items by ID and update total', () => {
      const produtoTeste = makeProduct({ price: Decimal('10.58') })
      const testItem = makeSaleItem({ productInfo: produtoTeste })

      sale.addItem(testItem)
      expect(sale.total).toEqual(Decimal('10.58'))
      sale.removeById(testItem.id)

      expect(sale.items).toEqual([])
      expect(sale.total).toEqual(Decimal('0'))
    })
  })

  describe('State', () => {
    test('Open should change the state accordingly', () => {
      sale.open()
      expect(sale.state).toBe(SaleState.OPEN)
    })
    test('Close should change the state accordingly', () => {
      const product = makeProduct({})
      const item = makeSaleItem({ productInfo: product })

      expect(sale.close).toThrow()
      sale.open()
      sale.addItem(item)
      sale.close()

      expect(sale.state).toBe(SaleState.CLOSED)
      expect(sale.close).toThrow()
    })
    test('Cancel Open sale', () => {
      sale.open()
      sale.cancel()
      expect(sale.state).toBe(SaleState.CANCELLED)
    })
    test('Cancel Closed sale', () => {
      const product = makeProduct({})
      const item = makeSaleItem({ productInfo: product })

      sale.open()
      sale.addItem(item)
      sale.close()
      sale.cancel()
      expect(sale.state).toBe(SaleState.CANCELLED)
    })
    test('Should not cancel a cancelled sale', () => {
      sale.cancel()
      expect(sale.state).toBe(SaleState.CANCELLED)
      expect(sale.cancel).toThrow()
    })
  })
})
