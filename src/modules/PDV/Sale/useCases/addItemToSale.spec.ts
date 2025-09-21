import { FakeSaleRepository } from '../Sale.repository'
import { AddItemToSaleUseCase } from './AddItemToSale.usecase'
import { Money } from 'src/modules/ERP/Money/Money'
import { makeSale } from '../Sale.factory'
import { makeSaleItem } from '../SaleItem.factory'
import { makeProduct } from 'src/modules/ERP/Product/Product.factory'

describe('AddItemToSale Usecase', () => {
  let addItemToSale: AddItemToSaleUseCase
  let fakeRepository: FakeSaleRepository

  beforeEach(() => {
    fakeRepository = new FakeSaleRepository()
    addItemToSale = new AddItemToSaleUseCase(fakeRepository)
  })

  test('should create an empty sale and save it on the repository', async () => {
    const sale = makeSale({})
    const product = makeProduct({ price: new Money('3.99') })
    const product2 = makeProduct({ price: new Money('6.99') })
    const saleItem = makeSaleItem({ productInfo: product.toProps() })
    const saleItem2 = makeSaleItem({ productInfo: product2.toProps() })

    fakeRepository.sales = [sale]

    const newSale = await addItemToSale.execute(saleItem, sale.id)

    expect(newSale.items.length).toBe(1)
    expect(newSale.items[0]).toEqual(saleItem)
    expect(newSale.items[0].productInfo).toEqual(product.toProps())

    const newSale2 = await addItemToSale.execute(saleItem2, sale.id)
    expect(newSale2.items.length).toBe(2)
    expect(newSale.items[1]).toEqual(saleItem2)
    expect(newSale.items[1].productInfo).toEqual(product2.toProps())
  })
})
