import { FakeSaleRepository } from '../Sale.repository'
import { RemoveItemFromSaleUseCase } from './removeItemFromSale.usecase'
import { Money } from 'src/modules/ERP/Money/Money'
import { makeSale } from '../Sale.factory'
import { makeProduct } from 'src/modules/ERP/Product/Product.factory'

describe('RemoveItemFromSale Usecase', () => {
  let removeItemFromSale: RemoveItemFromSaleUseCase
  let fakeRepository: FakeSaleRepository

  beforeEach(() => {
    fakeRepository = new FakeSaleRepository()
    removeItemFromSale = new RemoveItemFromSaleUseCase(fakeRepository)
  })

  test('should remove an item from sale', async () => {
    const sale = makeSale({})
    const product = makeProduct({ price: new Money('3.99') })
    const product2 = makeProduct({ price: new Money('6.99') })

    sale.addItem(product)
    sale.addItem(product2)

    fakeRepository.sales = [sale]

    const newSale = await removeItemFromSale.execute(sale.id, product.barcode)

    expect(newSale.items.length).toBe(1)
    expect(newSale.items[0].productInfo.barcode).toEqual(product2.barcode)

    const newSale2 = await removeItemFromSale.execute(sale.id, product2.barcode)
    expect(newSale2.items.length).toBe(0)
    expect(newSale.items).toEqual([])
  })
})
