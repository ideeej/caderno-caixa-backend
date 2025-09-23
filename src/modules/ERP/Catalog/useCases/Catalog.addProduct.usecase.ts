import { Product } from '../../Product/Product'
import { Catalog } from '../Catalog'
import { CatalogRepository } from '../Catalog.repository'

export class AddProductToCatalogUseCase {
  constructor(private catalogRepository: CatalogRepository) {}

  async execute(product: Product, catalogId: string): Promise<Catalog | null> {
    const catalog = await this.catalogRepository.findById(catalogId)

    if (!catalog) {
      throw new Error('Catalog não encontrado')
    }

    catalog.addProduct(product)

    await this.catalogRepository.save(catalog)

    return catalog
  }
}
