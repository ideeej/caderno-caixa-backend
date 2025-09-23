import { Money } from '../../Money/Money'
import { makeProduct } from '../../Product/Product.factory'
import { makeCatalog } from '../Catalog.factory'
import { FakeCatalogRepository } from '../Catalog.repository'
import { RemoveProductFromCatalogUseCase } from './Catalog.removeProduct.usecase'

describe('Catalog RemoveProduct Usecase', () => {
  let removeProductFromCatalog: RemoveProductFromCatalogUseCase
  let fakeRepository: FakeCatalogRepository

  beforeEach(() => {
    fakeRepository = new FakeCatalogRepository()
    removeProductFromCatalog = new RemoveProductFromCatalogUseCase(
      fakeRepository
    )
  })

  test('should remove a Product from the catalog', async () => {
    const catalog = makeCatalog({})
    const product = makeProduct({ price: new Money('3.49') })

    catalog.addProduct(product)
    fakeRepository.catalogs = [catalog]

    await removeProductFromCatalog.execute(product.id, catalog.id)
    expect(fakeRepository.catalogs[0].products.size).toBe(0)
  })
})
