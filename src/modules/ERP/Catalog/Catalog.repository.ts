import { IRepository } from 'src/utils/IRepository'
import { Catalog } from './Catalog'

export abstract class CatalogRepository implements IRepository<Catalog> {
  abstract findById(id: string): Promise<Catalog | null>
  abstract save(entity: Catalog): Promise<void>
  abstract delete(id: string): Promise<void>
}

export class FakeCatalogRepository implements CatalogRepository {
  public catalogs: Catalog[] = []

  async findById(id: string): Promise<Catalog | null> {
    const catalog = this.catalogs.find(s => s.id === id)
    return catalog || null
  }

  async save(catalog: Catalog): Promise<void> {
    const index = this.catalogs.findIndex(s => s.id === catalog.id)

    if (index >= 0) {
      this.catalogs[index] = catalog // Atualiza o produto
    } else {
      this.catalogs.push(catalog) // Adiciona novo produto
    }
  }

  async delete(id: string): Promise<void> {
    this.catalogs = this.catalogs.filter(s => s.id !== id)
  }
}
