import Decimal from 'decimal.js'
import { makeNotaFiscal } from '../factories/NotaFiscalFactory'
import { makeNotaFiscalItem } from '../factories/NotaFiscalItemFactory'
import { makeProduct } from '../../product/productFactory'
import { NotaFiscal, NotaFiscalState } from './NotaFiscal'
import { PaymentType } from 'src/utils/paymentType'
import { Payment, PaymentProps } from 'src/utils/payment'

describe('Domain NotaFiscal', () => {
  describe('Core', () => {
    test('NotaFiscal Creation', () => {
      const testNotaFiscal = makeNotaFiscal({})

      expect(testNotaFiscal.payments).toEqual([])
      expect(testNotaFiscal.items).toEqual([])
      expect(testNotaFiscal.state).toBe(NotaFiscalState.OPEN)
      expect(testNotaFiscal.closedAt).toBeNull()
    })

    describe('Items', () => {
      let testNotaFiscal

      beforeEach(() => {
        testNotaFiscal = makeNotaFiscal({})
      })

      test('AddItem should add an item to items and update subtotal', () => {
        const produtoTeste = makeProduct({ price: Decimal('10.58') })
        const testItem = makeNotaFiscalItem({ product: produtoTeste })

        testNotaFiscal.addItem(testItem)

        expect(testNotaFiscal.items[0]).toEqual(testItem)
        expect(testNotaFiscal.subtotal).toEqual(Decimal('10.58'))
      })

      test('removeByIndex should remove an item from items by index and update subtotal', () => {
        const produtoTest = makeProduct({ price: Decimal('10.58') })
        const testItem = makeNotaFiscalItem({ product: produtoTest })

        testNotaFiscal.addItem(testItem)
        expect(testNotaFiscal.subtotal).toEqual(Decimal('10.58'))
        testNotaFiscal.removeByIndex(0)

        expect(testNotaFiscal.items).toEqual([])
        expect(testNotaFiscal.subtotal).toEqual(Decimal('0'))
      })

      test('removeById should remove an item from items by ID and update subtotal', () => {
        const produtoTeste = makeProduct({ price: Decimal('10.58') })
        const testItem = makeNotaFiscalItem({ product: produtoTeste })

        testNotaFiscal.addItem(testItem)
        expect(testNotaFiscal.subtotal).toEqual(Decimal('10.58'))
        testNotaFiscal.removeById(testItem.id)

        expect(testNotaFiscal.items).toEqual([])
        expect(testNotaFiscal.subtotal).toEqual(Decimal('0'))
      })

      test('removeItemsByIds should be able to remove more than one item and update subtotal', () => {
        const products = [
          makeProduct({ price: Decimal('1.00') }, '1'),
          makeProduct({ price: Decimal('2.00') }, '2'),
          makeProduct({ price: Decimal('3.00') }, '3'),
          makeProduct({ price: Decimal('4.00') }, '4'),
        ]

        const nfItems = products.map(prod =>
          makeNotaFiscalItem({ product: prod }, prod.id)
        )

        nfItems.forEach(item => {
          testNotaFiscal.addItem(item)
        })

        const ids_to_remove = products
          .filter(prod => {
            if (prod.price.gt(Decimal('2'))) {
              return prod.id
            }
          })
          .map(item => item.id)

        testNotaFiscal.removeItemsByIds(ids_to_remove)

        const idsInTestNotaFiscal = testNotaFiscal.items.map(
          item => item.product.id
        )

        expect(idsInTestNotaFiscal).toEqual(['1', '2'])
      })
    })

    describe('Payments', () => {
      let testNotaFiscal

      beforeEach(() => {
        testNotaFiscal = makeNotaFiscal({})
      })

      test('addPayment should add payments and update totalPaid', () => {
        const products = [
          makeProduct({ price: Decimal('3.59') }),
          makeProduct({ price: Decimal('6.99') }),
        ]

        const items = products.map(product => makeNotaFiscalItem({ product }))

        items.forEach(item => {
          testNotaFiscal.addItem(item)
        })

        testNotaFiscal.finalize()

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
          testNotaFiscal.addPayment(payment)
        })
        expect(testNotaFiscal.totalPaid).toEqual(Decimal('32.81'))
      })

      test('cancelPayment should remove payments and update totalPaid', () => {
        const products = [
          makeProduct({ price: Decimal('3.59') }),
          makeProduct({ price: Decimal('6.99') }),
          makeProduct({ price: Decimal('10.99') }),
          makeProduct({ price: Decimal('3.99') }),
        ]

        const items = products.map(product => makeNotaFiscalItem({ product }))

        items.forEach(item => {
          testNotaFiscal.addItem(item)
        })

        testNotaFiscal.finalize()

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
            amount: Decimal('10.56'),
            type: PaymentType.CASH,
          },
        ]

        payments.forEach(payment => {
          testNotaFiscal.addPayment(payment)
        })

        // Cancels by Index
        testNotaFiscal.cancelPayment(2)
        expect(testNotaFiscal.totalPaid).toEqual(Decimal('15'))

        testNotaFiscal.cancelPayment(1)
        expect(testNotaFiscal.totalPaid).toEqual(Decimal('10'))

        testNotaFiscal.cancelPayment(0)
        expect(testNotaFiscal.totalPaid).toEqual(Decimal('0'))
      })
    })

    describe('States', () => {
      let testNotaFiscal
      beforeEach(() => {
        testNotaFiscal = makeNotaFiscal({})
      })

      test('Finalize should change the state correctly', () => {
        expect(testNotaFiscal.finalize).toThrow()

        const products = [
          makeProduct({ price: Decimal('2.99') }),
          makeProduct({ price: Decimal('6.99') }),
          makeProduct({ price: Decimal('7.49') }),
          makeProduct({ price: Decimal('5.45') }),
        ]

        const items = products.map(product => makeNotaFiscalItem({ product }))

        items.forEach(item => {
          testNotaFiscal.addItem(item)
        })

        testNotaFiscal.finalize()
        expect(testNotaFiscal.state).toBe(NotaFiscalState.FINALIZING)
      })

      test('close', () => {
        expect(testNotaFiscal.close).toThrow()

        const products = [
          makeProduct({ price: Decimal('2.99') }),
          makeProduct({ price: Decimal('6.99') }),
          makeProduct({ price: Decimal('7.49') }),
          makeProduct({ price: Decimal('5.45') }),
        ]

        const items = products.map(product => makeNotaFiscalItem({ product }))

        items.forEach(item => {
          testNotaFiscal.addItem(item)
        })

        // Not yet, still needs to finalize
        expect(testNotaFiscal.close).toThrow()

        testNotaFiscal.finalize()

        testNotaFiscal.close()
        expect(testNotaFiscal.state).toBe(NotaFiscalState.CLOSED)
      })

      test('revertToOpen', () => {
        const products = [
          makeProduct({ price: Decimal('2.99') }),
          makeProduct({ price: Decimal('6.99') }),
          makeProduct({ price: Decimal('7.49') }),
          makeProduct({ price: Decimal('5.45') }),
        ]

        const items = products.map(product => makeNotaFiscalItem({ product }))

        items.forEach(item => {
          testNotaFiscal.addItem(item)
        })

        testNotaFiscal.finalize()
        testNotaFiscal.revertToOpen()
        expect(testNotaFiscal.state).toBe(NotaFiscalState.OPEN)
        expect(testNotaFiscal.payments).toEqual([])

        testNotaFiscal.finalize()
        testNotaFiscal.close()
        expect(testNotaFiscal.revertToOpen).toThrow()
      })
    })
  })
})
