import { Product } from '../../Product/Product'
import { Catalog } from '../Catalog'
import { CatalogRepository } from '../Catalog.repository'

export class CreateCatalogUseCase {
  constructor(private catalogRepository: CatalogRepository) {}

  async execute(): Promise<Catalog | null> {
    const catalog: Catalog = new Catalog({
      products: new Map<string, Product>(),
    })

    await this.catalogRepository.save(catalog)
    return catalog
  }
}
