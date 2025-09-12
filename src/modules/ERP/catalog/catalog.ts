import { Entity } from 'src/modules/entity'
import { Product, ProductProps } from '../product/product'
import Decimal from 'decimal.js'

export interface CatalogProps {
  products: Map<string, Product>
}

interface ProductSearch {
  name?: string
  minPrice?: Decimal
  maxPrice?: Decimal
  barcode?: string
}

export class Catalog extends Entity<CatalogProps> {
  constructor(props: CatalogProps, id?: string) {
    super(
      {
        products: props.products ?? new Map<string, Product>(),
      },
      id
    )
  }

  get products(): Product[] {
    return Array.from(this.props.products.values())
  }

  getProduct(id: string): Product | null {
    return this.props.products.get(id) ?? null
  }

  getProductByBarcode(barcode: string): Product | null {
    return (
      Array.from(this.props.products.values()).find(
        product => product.barcode === barcode
      ) ?? null
    )
  }

  addProduct(newProd: Product) {
    if (this.props.products.has(newProd.id)) {
      throw new Error('Produto já existe no catálogo')
    }

    if (this.getProductByBarcode(newProd.barcode)) {
      throw new Error('Já existe um produto com este código de barras')
    }
    this.props.products.set(newProd.id, newProd)
  }

  addProducts(newProds: Product[]) {
    newProds.forEach(product => this.addProduct(product))
  }

  editProduct(id: string, editProps: ProductProps) {
    const product = this.getProduct(id)
    if (!product) {
      throw new Error('Produto não encontrado')
    }
    // Verifica se o código de barras já existe em outro produto
    if (editProps.barcode !== product.barcode) {
      const existingProduct = this.getProductByBarcode(editProps.barcode)
      if (existingProduct) {
        throw new Error('Código de barras já está em uso')
      }
    }
    product.edit(editProps)
  }

  removeProduct(id: string) {
    if (!this.props.products.has(id)) {
      throw new Error('Produto não encontrado')
    }
    this.props.products.delete(id)
  }

  searchProducts(query: ProductSearch): Product[] {
    return this.products.filter(product => {
      if (
        query.name &&
        !product.name.toLowerCase().includes(query.name.toLowerCase())
      ) {
        return false
      }
      if (query.barcode && product.barcode !== query.barcode) {
        return false
      }
      if (query.minPrice && product.price.lessThan(query.minPrice)) {
        return false
      }
      if (query.maxPrice && product.price.greaterThan(query.maxPrice)) {
        return false
      }
      return true
    })
  }

  listProducts(
    page: number = 1,
    limit: number = 10
  ): { products: Product[]; total: number } {
    const start = (page - 1) * limit
    const end = start + limit
    const allProducts = this.products

    return {
      products: allProducts.slice(start, end),
      total: allProducts.length,
    }
  }
}
