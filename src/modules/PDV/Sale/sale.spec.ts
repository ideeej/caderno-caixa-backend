import Decimal from 'decimal.js'
import { makeSale } from './sale.factory'
import { Sale, SaleState } from './sale'
import { makeProduct } from 'src/modules/ERP/product/productFactory'
import { makeSaleItem } from './saleItem.factory'
import { Payment, PaymentType } from 'src/utils/payment'
import { makeClient } from 'src/modules/ERP/Client/client.factory'
import { makeCompany } from 'src/modules/ERP/Company/company.factory'

describe('SALE TESTS', () => {
  let sale: Sale
  beforeEach(() => {
    sale = makeSale({})
  })

  test('SALE Test Creation with Client and Company', () => {
    expect(sale.items).toEqual([])
    expect(sale.state).toBe(SaleState.CREATED)
    expect(sale.total).toEqual(Decimal('0'))
    expect(sale.closedAt).toBeNull()
    expect(sale.cancelledAt).toBeNull()
    expect(sale.finishedAt).toBeNull()
    expect(sale.customer).toBeNull()
    expect(sale.payments).toEqual([])
    expect(sale.totalPaid).toEqual(Decimal('0'))
    expect(sale.change).toEqual(Decimal('0'))
    expect(sale.isFullyPaid).toBe(false)

    const testClient = makeClient({ name: 'Cliente teste' })
    sale.assignCustomer(testClient)
    expect(sale.customer).toEqual(testClient)
    expect(sale.customer?.name).toBe('Cliente teste')

    const testCompany = makeCompany({ corporateName: 'Empresa teste' })
    sale.assignCustomer(testCompany)
    expect(sale.customer).toEqual(testCompany)
    expect(sale.customer?.name).toBe('Empresa teste')
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

  describe('Payments', () => {
    test('AddPayment should add a payment to payments and update paidAmount and change', () => {
      const product = makeProduct({ price: Decimal('10.58') })
      const item = makeSaleItem({ productInfo: product })

      sale.open()
      sale.addItem(item)
      expect(sale.total).toEqual(Decimal('10.58'))
      expect(sale.totalPaid).toEqual(Decimal('0'))
      expect(sale.change).toEqual(Decimal('0'))
      expect(sale.isFullyPaid).toBe(false)

      const payment = new Payment({
        amount: Decimal('20.00'),
        type: PaymentType.CASH,
      })

      sale.close() // Accepting payments now
      sale.addPayment(payment)
      expect(sale.payments.length).toBe(1)
      expect(sale.totalPaid).toEqual(Decimal('20.00'))
      expect(sale.change).toEqual(Decimal('9.42'))
      expect(sale.isFullyPaid).toBe(true)

      sale.addPayment(
        new Payment({
          amount: Decimal('10.00'),
          type: PaymentType.CASH,
        })
      )
      expect(sale.payments.length).toBe(2)
      expect(sale.totalPaid).toEqual(Decimal('30.00'))
      expect(sale.change).toEqual(Decimal('19.42'))
      expect(sale.isFullyPaid).toBe(true)
    })

    test('RemovePayment should remove a payment from payments, update paidAmount and change', () => {
      const product = makeProduct({ price: Decimal('10.58') })
      const item = makeSaleItem({ productInfo: product })

      sale.addItem(item)

      const payment = new Payment({
        amount: Decimal('20.00'),
        type: PaymentType.CASH,
      })

      sale.close()
      sale.addPayment(payment)
      sale.removePayment(payment.id)

      expect(sale.payments.length).toBe(0)
      expect(sale.totalPaid).toEqual(Decimal('0'))
      expect(sale.change).toEqual(Decimal('0'))
      expect(sale.isFullyPaid).toBe(false)
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

      expect(() => {
        sale.close()
      }).toThrow()
      sale.open()
      sale.addItem(item)
      sale.close()

      expect(sale.state).toBe(SaleState.CLOSED)
      expect(() => {
        sale.close()
      }).toThrow()
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
      expect(() => {
        sale.cancel()
      }).toThrow()
    })
  })
})
