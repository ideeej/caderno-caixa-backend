import { CreateInventoryUseCase } from 'src/modules/ERP/Inventory/useCases/Inventory.create.usecase'
import { Sale, SaleState } from '../Sale'
import { FakeSaleRepository } from '../Sale.repository'
import { CreateSaleUseCase } from './createSale.usecase'
import { FakeInventoryRepository } from 'src/modules/ERP/Inventory/Inventory.repository'
import { makeInventory } from 'src/modules/ERP/Inventory/Inventory.factory'

describe('CreateSale Usecase', () => {
  let createSaleUseCase: CreateSaleUseCase
  let createInventoryUseCase: CreateInventoryUseCase
  let fakeRepository: FakeSaleRepository
  let fakeInventoryRepository: FakeInventoryRepository

  beforeEach(() => {
    fakeRepository = new FakeSaleRepository()
    fakeInventoryRepository = new FakeInventoryRepository()
    createInventoryUseCase = new CreateInventoryUseCase(fakeInventoryRepository)

    createSaleUseCase = new CreateSaleUseCase(
      fakeRepository,
      fakeInventoryRepository,
      createInventoryUseCase
    )
  })

  test('should create an empty sale and save it on the repository', async () => {
    const inventory = await createInventoryUseCase.execute()

    const sale: Sale = await createSaleUseCase.execute(inventory!.id)

    expect(sale.items).toEqual([])
    expect(sale.state).toBe(SaleState.CREATED)
    expect(sale.inventory.id).toBe(inventory?.id)
    expect(sale.closedAt).toBeNull()
    expect(sale.cancelledAt).toBeNull()
    expect(sale.finishedAt).toBeNull()
    expect(sale.customer).toBeNull()
    expect(sale.payments).toEqual([])
    expect(sale.total.value.toString()).toBe('0')
    expect(sale.totalPaid.value.toString()).toBe('0')
    expect(sale.change.value.toString()).toBe('0')
    expect(sale.isFullyPaid).toBe(false)
  })
})
