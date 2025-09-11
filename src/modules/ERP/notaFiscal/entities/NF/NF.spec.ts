import Decimal from 'decimal.js'

import { NFState, NFType } from './NF'

import { makeProduct } from '../../../product/productFactory'

import { makeNF } from './NF.factory'
import { makeNFItem } from '../NFItem.factory'

describe('NF TESTS', () => {
  describe('Core', () => {
    test('NF Creation', () => {
      const NOTAFISCAL_TEST = makeNF({})

      expect(NOTAFISCAL_TEST.items).toEqual([])
      expect(NOTAFISCAL_TEST.state).toBe(NFState.OPEN)
      expect(NOTAFISCAL_TEST.type).toBe(NFType.CUSTOMER)
      expect(NOTAFISCAL_TEST.subtotal).toEqual(Decimal('0'))
      expect(NOTAFISCAL_TEST.closedAt).toBeNull()
    })

    describe('Items', () => {
      let testNotaFiscal

      beforeEach(() => {
        testNotaFiscal = makeNF({})
      })

      test('AddItem should add an item to items and update subtotal', () => {
        const produtoTeste = makeProduct({ price: Decimal('10.58') })
        const testItem = makeNFItem({ product: produtoTeste })

        testNotaFiscal.addItem(testItem)

        expect(testNotaFiscal.items[0]).toEqual(testItem)
        expect(testNotaFiscal.subtotal).toEqual(Decimal('10.58'))
      })

      test('removeByIndex should remove an item from items by index and update subtotal', () => {
        const produtoTest = makeProduct({ price: Decimal('10.58') })
        const testItem = makeNFItem({ product: produtoTest })

        testNotaFiscal.addItem(testItem)
        expect(testNotaFiscal.subtotal).toEqual(Decimal('10.58'))
        testNotaFiscal.removeByIndex(0)

        expect(testNotaFiscal.items).toEqual([])
        expect(testNotaFiscal.subtotal).toEqual(Decimal('0'))
      })

      test('removeById should remove an item from items by ID and update subtotal', () => {
        const produtoTeste = makeProduct({ price: Decimal('10.58') })
        const testItem = makeNFItem({ product: produtoTeste })

        testNotaFiscal.addItem(testItem)
        expect(testNotaFiscal.subtotal).toEqual(Decimal('10.58'))
        testNotaFiscal.removeById(testItem.id)

        expect(testNotaFiscal.items).toEqual([])
        expect(testNotaFiscal.subtotal).toEqual(Decimal('0'))
      })
    })

    describe('State', () => {
      test('close', () => {
        let testNotaFiscal = makeNF({})

        const products = [
          makeProduct({ price: Decimal('2.99') }),
          makeProduct({ price: Decimal('6.99') }),
          makeProduct({ price: Decimal('7.49') }),
          makeProduct({ price: Decimal('5.45') }),
        ]

        const items = products.map(product => makeNFItem({ product }))

        items.forEach(item => {
          testNotaFiscal.addItem(item)
        })

        testNotaFiscal.close()
        expect(testNotaFiscal.state).toBe(NFState.CLOSED)
      })
    })
  })
})
