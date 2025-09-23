import { ProductProps } from '../../Product/Product'
import { Catalog } from '../Catalog'
import { CatalogRepository } from '../Catalog.repository'

export class EditCatalogProductUseCase {
  constructor(private catalogRepository: CatalogRepository) {}

  async execute(
    catalogId: string,
    productId: string,
    productData: ProductProps
  ): Promise<Catalog | null> {
    const catalog = await this.catalogRepository.findById(catalogId)

    if (!catalog) {
      throw new Error('O Catalogo não foi encontrado.')
    }

    catalog.editProduct(productId, productData)

    await this.catalogRepository.save(catalog)
    return catalog
  }
}
