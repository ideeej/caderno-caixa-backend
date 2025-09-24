import { makeProduct } from 'src/modules/ERP/Product/Product.factory'
import { SaleState } from '../Sale'
import { makeSale } from '../Sale.factory'
import { CloseSaleUseCase } from './closeSale.usecase'
import { Money } from 'src/modules/ERP/Money/Money'
import { FakeInventoryRepository } from 'src/modules/ERP/Inventory/Inventory.repository'
import { FakeSaleRepository } from '../Sale.repository'
import { makeInventory } from 'src/modules/ERP/Inventory/Inventory.factory'

describe('CloseSale Usecase', () => {
  let fakeRepository: FakeSaleRepository
  let fakeInventoryRepository: FakeInventoryRepository

  let closeSaleUseCase: CloseSaleUseCase

  beforeEach(() => {
    fakeRepository = new FakeSaleRepository()
    fakeInventoryRepository = new FakeInventoryRepository()

    closeSaleUseCase = new CloseSaleUseCase(
      fakeRepository,
      fakeInventoryRepository
    )
  })

  test('should close a sale on the repository', async () => {
    const inventory = makeInventory({})

    const sale = makeSale({ inventory })

    fakeRepository.sales = [sale]
    const closedSale = await closeSaleUseCase.execute(sale.id)

    expect(closedSale.state).toBe(SaleState.CLOSED)
    expect(closedSale.closedAt).toBeInstanceOf(Date)
    expect(closedSale.total.value.toString()).toBe('0')
  })

  test('Should update the inventory when sale is closed', async () => {
    const inventory = makeInventory({})
    const sale = makeSale({ inventory })
    const product = makeProduct({ price: new Money('3.49') })

    inventory?.performEntry(product.barcode, 10)
    sale.addItem(product, 2)

    fakeInventoryRepository.inventories = [inventory]
    fakeRepository.sales = [sale]

    const closedSale = await closeSaleUseCase.execute(sale.id)

    expect(closedSale.state).toBe(SaleState.CLOSED)
    expect(closedSale.closedAt).toBeInstanceOf(Date)
    expect(closedSale.total.value.toString()).toBe('6.98')
  })
})
