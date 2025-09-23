import { Money } from '../../Money/Money'
import { makeProduct } from '../../Product/Product.factory'
import { makeCatalog } from '../Catalog.factory'
import { FakeCatalogRepository } from '../Catalog.repository'
import { AddProductToCatalogUseCase } from './Catalog.addProduct.usecase'

describe('Catalog AddProduct Usecase', () => {
  let addProductToCatalog: AddProductToCatalogUseCase
  let fakeRepository: FakeCatalogRepository

  beforeEach(() => {
    fakeRepository = new FakeCatalogRepository()
    addProductToCatalog = new AddProductToCatalogUseCase(fakeRepository)
  })

  test('should add a Product to the catalog', async () => {
    const catalog = makeCatalog({})
    const product = makeProduct({ price: new Money('3.49') })

    fakeRepository.catalogs = [catalog]

    await addProductToCatalog.execute(product, catalog.id)
  })
})
