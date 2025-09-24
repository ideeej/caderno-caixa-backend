import { FakeSaleRepository } from '../Sale.repository'
import { AddItemToSaleUseCase } from './AddItemToSale.usecase'
import { Money } from 'src/modules/ERP/Money/Money'
import { makeSale } from '../Sale.factory'
import { makeProduct } from 'src/modules/ERP/Product/Product.factory'

describe('AddItemToSale Usecase', () => {
  let addItemToSale: AddItemToSaleUseCase
  let fakeRepository: FakeSaleRepository

  beforeEach(() => {
    fakeRepository = new FakeSaleRepository()
    addItemToSale = new AddItemToSaleUseCase(fakeRepository)
  })

  test('should add items to a sale and save it on the repository', async () => {
    const sale = makeSale({})
    const product = makeProduct({ price: new Money('3.99') })
    const product2 = makeProduct({ price: new Money('6.99') })

    fakeRepository.sales = [sale]

    const updatedSale = await addItemToSale.execute(sale.id, product, 5)

    expect(updatedSale.items.length).toBe(1)
    expect(updatedSale.items[0].productInfo.barcode).toEqual(product.barcode)
    expect(updatedSale.items[0].quantity).toEqual(5)

    const updatedSale2 = await addItemToSale.execute(sale.id, product2, 6)
    expect(updatedSale2.items.length).toBe(2)
    expect(updatedSale2.items[1].productInfo.barcode).toEqual(product2.barcode)
    expect(updatedSale2.items[1].quantity).toEqual(6)
  })
})
