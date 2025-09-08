import { Catalog, CatalogProps } from './catalog'

export const testCatalog: CatalogProps = {
  products: [],
}

export const makeCatalog = (props: Partial<CatalogProps>, id?: string) => {
  return new Catalog(
    {
      ...props,
      ...testCatalog,
    },
    id
  )
}
