import { Catalog, CatalogProps } from './catalog'
import { Product } from '../product/product'

export const makeCatalog = (props?: Partial<CatalogProps>, id?: string) => {
  return new Catalog(
    {
      products: props?.products ?? new Map<string, Product>(),
    },
    id
  )
}
