import { Catalog } from '../Catalog'
import { FakeCatalogRepository } from '../Catalog.repository'
import { CreateCatalogUseCase } from './Catalog.createCatalog.usecase'

describe('CreateSale Usecase', () => {
  let createCatalog: CreateCatalogUseCase
  let fakeRepository: FakeCatalogRepository

  beforeEach(() => {
    fakeRepository = new FakeCatalogRepository()
    createCatalog = new CreateCatalogUseCase(fakeRepository)
  })

  test('should create an empty Catalog and save it on the repository', async () => {
    const catalog: Catalog | null = await createCatalog.execute()

    if (!catalog) {
      throw new Error('Catalog was not created')
    }

    expect(catalog).not.toBeNull()
    if (catalog) {
      expect(catalog).toBeInstanceOf(Catalog)
      expect(catalog.products.size).toBe(0)
    }
  })
})
