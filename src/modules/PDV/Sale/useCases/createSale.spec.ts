import { Sale, SaleState } from '../Sale'
import { FakeSaleRepository } from '../Sale.repository'
import { CreateSaleUseCase } from './createSale.usecase'

describe('CreateSale Usecase', () => {
  let createSaleUseCase: CreateSaleUseCase
  let fakeRepository: FakeSaleRepository

  beforeEach(() => {
    fakeRepository = new FakeSaleRepository()
    createSaleUseCase = new CreateSaleUseCase(fakeRepository)
  })

  test('should create an empty sale and save it on the repository', async () => {
    const sale: Sale = await createSaleUseCase.execute()

    expect(sale.items).toEqual([])
    expect(sale.state).toBe(SaleState.CREATED)
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
