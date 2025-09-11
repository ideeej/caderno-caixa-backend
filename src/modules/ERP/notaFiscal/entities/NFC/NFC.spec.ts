import Decimal from 'decimal.js'

import { PaymentType } from 'src/utils/payment'
import { PaymentProps } from 'src/utils/payment'

import { makeProduct } from 'src/modules/ERP/product/productFactory'
import { makeNFC } from './NFC.factory'
import { makeNFItem } from '../NFItem.factory'
import { NFState } from '../NF/NF'

describe('NFC TESTS', () => {
  describe('Core', () => {
    test('NF Creation', () => {
      const NOTAFISCAL_TEST = makeNFC({})

      expect(NOTAFISCAL_TEST.payments).toEqual([])
      expect(NOTAFISCAL_TEST.items).toEqual([])
      expect(NOTAFISCAL_TEST.subtotal).toEqual(Decimal('0'))
      expect(NOTAFISCAL_TEST.closedAt).toBeNull()
    })

    describe('Items', () => {
      let testNotaFiscal

      beforeEach(() => {
        testNotaFiscal = makeNFC({})
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
    describe('Payments', () => {
      let nfc

      beforeEach(() => {
        nfc = makeNFC({})
      })

      test('addPayment should add payments and update totalPaid and change', () => {
        const products = [
          makeProduct({ price: Decimal('3.59') }),
          makeProduct({ price: Decimal('6.99') }),
        ]

        const items = products.map(product => makeNFItem({ product }))

        items.forEach(item => {
          nfc.addItem(item)
        })

        nfc.startPayment()

        const cash_payments: PaymentProps[] = [
          {
            amount: Decimal('10.58'),
            type: PaymentType.CASH,
          },
          {
            amount: Decimal('10'),
            type: PaymentType.CASH,
          },
          {
            amount: Decimal('12.23'),
            type: PaymentType.CASH,
          },
        ]

        cash_payments.forEach(payment => {
          nfc.addPayment(payment)
        })
        expect(nfc.totalPaid).toEqual(Decimal('32.81'))
        expect(nfc.change).toEqual(Decimal('22.23'))
      })

      test('cancelPayment should remove payments and update totalPaid and change', () => {
        const products = [
          makeProduct({ price: Decimal('3.59') }),
          makeProduct({ price: Decimal('6.99') }),
          makeProduct({ price: Decimal('10.99') }),
          makeProduct({ price: Decimal('3.99') }),
        ]

        const items = products.map(product => makeNFItem({ product }))

        items.forEach(item => {
          nfc.addItem(item)
        })

        nfc.startPayment()

        const payments: PaymentProps[] = [
          {
            amount: Decimal('10'),
            type: PaymentType.CASH,
          },
          {
            amount: Decimal('5'),
            type: PaymentType.CASH,
          },
          {
            amount: Decimal('20'),
            type: PaymentType.CASH,
          },
        ]

        payments.forEach(payment => {
          nfc.addPayment(payment)
        })

        expect(nfc.change).toEqual(Decimal('9.44'))

        // Cancels by Index
        nfc.cancelPayment(2)
        expect(nfc.totalPaid).toEqual(Decimal('15'))
        expect(nfc.change).toEqual(Decimal('10.56'))

        nfc.cancelPayment(1)
        expect(nfc.totalPaid).toEqual(Decimal('10'))
        expect(nfc.change).toEqual(Decimal('15.56'))

        nfc.cancelPayment(0)
        expect(nfc.totalPaid).toEqual(Decimal('0'))
        expect(nfc.change).toEqual(nfc.subtotal)
      })
    })

    describe('States', () => {
      let nfc
      beforeEach(() => {
        nfc = makeNFC({})
      })

      test('StartPayment should change the state correctly', () => {
        expect(nfc.startPayment).toThrow()

        const products = [
          makeProduct({ price: Decimal('2.99') }),
          makeProduct({ price: Decimal('6.99') }),
          makeProduct({ price: Decimal('7.49') }),
          makeProduct({ price: Decimal('5.45') }),
        ]

        const items = products.map(product => makeNFItem({ product }))

        items.forEach(item => {
          nfc.addItem(item)
        })

        nfc.startPayment()
        expect(nfc.paymentStarted).toBe(true)
      })

      test('close should change the state correctly', () => {
        expect(nfc.close).toThrow()

        const products = [
          makeProduct({ price: Decimal('2.99') }),
          makeProduct({ price: Decimal('6.99') }),
          makeProduct({ price: Decimal('7.49') }),
          makeProduct({ price: Decimal('5.45') }),
        ]

        const items = products.map(product => makeNFItem({ product }))

        items.forEach(item => {
          nfc.addItem(item)
        })

        // Not yet, still needs to startPayment
        expect(nfc.close).toThrow()

        nfc.startPayment()

        nfc.close()
        expect(nfc.notaFiscal.state).toBe(NFState.CLOSED)
      })

      test('revertToOpen should change the state correctly', () => {
        const products = [
          makeProduct({ price: Decimal('2.99') }),
          makeProduct({ price: Decimal('6.99') }),
          makeProduct({ price: Decimal('7.49') }),
          makeProduct({ price: Decimal('5.45') }),
        ]

        const items = products.map(product => makeNFItem({ product }))

        items.forEach(item => {
          nfc.addItem(item)
        })

        nfc.startPayment()
        nfc.revertToOpen()
        expect(nfc.notaFiscal.state).toBe(NFState.OPEN)
        expect(nfc.payments).toEqual([])

        nfc.startPayment()
        nfc.close()
        expect(nfc.revertToOpen).toThrow()
      })
    })
  })
})
