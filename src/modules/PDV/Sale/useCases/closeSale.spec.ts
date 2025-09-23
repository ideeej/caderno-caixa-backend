import { makeProduct } from 'src/modules/ERP/Product/Product.factory'
import { SaleState } from '../Sale'
import { makeSale } from '../Sale.factory'
import { FakeSaleRepository } from '../Sale.repository'
import { makeSaleItem } from '../SaleItem.factory'
import { CloseSaleUseCase } from './closeSale.usecase'
import { Money } from 'src/modules/ERP/Money/Money'

describe('CloseSale Usecase', () => {
  let closeSaleUseCase: CloseSaleUseCase
  let fakeRepository: FakeSaleRepository

  beforeEach(() => {
    fakeRepository = new FakeSaleRepository()
    closeSaleUseCase = new CloseSaleUseCase(fakeRepository)
  })

  test('should create an empty sale and save it on the repository', async () => {
    const sale = makeSale({})
    const product = makeProduct({ price: new Money('3.49') })
    const saleItem = makeSaleItem({ productInfo: product })

    sale.addItem(saleItem)
    fakeRepository.sales = [sale]

    const closedSale = await closeSaleUseCase.execute(sale.id)

    expect(closedSale.state).toBe(SaleState.CLOSED)
    expect(closedSale.closedAt).toBeInstanceOf(Date)
    expect(closedSale.total.value.toString()).toBe('3.49')
  })
})
