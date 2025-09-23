import { Money } from '../../Money/Money'
import { makeProduct, makeProductProps } from '../../Product/Product.factory'
import { makeCatalog } from '../Catalog.factory'
import { FakeCatalogRepository } from '../Catalog.repository'
import { EditCatalogProductUseCase } from './Catalog.editProduct.usecase'

describe('Catalog EditProduct Usecase', () => {
  let catalogEditProduct: EditCatalogProductUseCase
  let fakeRepository: FakeCatalogRepository

  beforeEach(() => {
    fakeRepository = new FakeCatalogRepository()
    catalogEditProduct = new EditCatalogProductUseCase(fakeRepository)
  })

  test('should edit a product from Catalog and save it on the repository', async () => {
    const catalog = makeCatalog({})
    const product = makeProduct({ price: new Money('3.99') })

    catalog.addProduct(product)
    await fakeRepository.save(catalog)

    const editedProductProps = makeProductProps({ price: new Money('4.59') })
    const editedCatalog = await catalogEditProduct.execute(
      catalog.id,
      product.id,
      editedProductProps
    )

    expect(editedCatalog).toBeDefined()
    const productInCatalog = editedCatalog?.products.get(product.id)
    expect(productInCatalog?.toProps()).toEqual(editedProductProps)
  })
})
