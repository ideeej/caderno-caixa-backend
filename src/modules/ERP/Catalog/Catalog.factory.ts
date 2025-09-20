import { Catalog, CatalogProps } from './Catalog'
import { Product } from '../Product/Product'

export const makeCatalog = (props?: Partial<CatalogProps>, id?: string) => {
  return new Catalog(
    {
      products: props?.products ?? new Map<string, Product>(),
    },
    id
  )
}
