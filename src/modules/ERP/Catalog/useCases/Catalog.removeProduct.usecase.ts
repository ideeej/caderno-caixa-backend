import { Catalog } from '../Catalog'
import { CatalogRepository } from '../Catalog.repository'

export class RemoveProductFromCatalogUseCase {
  constructor(private catalogRepository: CatalogRepository) {}

  async execute(productId: string, catalogId: string): Promise<Catalog | null> {
    const catalog = await this.catalogRepository.findById(catalogId)

    if (!catalog) {
      throw new Error('Catalog não encontrado')
    }

    catalog.removeProduct(productId)

    await this.catalogRepository.save(catalog)

    return catalog
  }
}
