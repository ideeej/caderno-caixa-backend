import { randomUUID } from 'crypto'
import { Product, ProductProps } from '../product/product'

export interface CatalogProps {
  products: Product[]
}

export class Catalog {
  private props: CatalogProps
  private _id: string

  constructor(props: CatalogProps, id) {
    this.props = {
      ...props,
      products: props.products ? [...props.products] : [],
    }
    this._id = id ?? randomUUID()
  }

  get id(): string {
    return this._id
  }

  get products(): Product[] {
    return this.props.products
  }

  set products(newProds: Product[]) {
    this.props.products = [...newProds]
  }

  getProduct(id: string): Product | null {
    return this.props.products.find(product => product.id === id) ?? null
  }

  addProduct(newProd: Product) {
    this.props.products.push(newProd)
  }

  addProducts(newProds: Product[]) {
    newProds.forEach(product => {
      this.props.products.push(product)
    })
  }

  editProduct(id: string, editProps: ProductProps) {
    const editingProduct = this.props.products.find(
      product => product.id === id
    )
    editingProduct?.edit(editProps)
  }

  removeProduct(id: string) {
    this.props.products = this.props.products.filter(
      product => product.id !== id
    )
  }
}
