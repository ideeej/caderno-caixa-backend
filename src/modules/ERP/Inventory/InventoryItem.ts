import { randomUUID } from 'node:crypto'
import { ProductProps } from '../Product/Product'

export interface InventoryItemProps {
  productId: string
  product: ProductProps
  quantity: number
}

export class InventoryItem {
  private props: InventoryItemProps
  private _id: string

  constructor(props: InventoryItemProps, id?: string) {
    this.props = { ...props }
    this._id = id ?? randomUUID()
  }

  get id(): string {
    return this._id
  }

  get productId(): string {
    return this.props.productId
  }

  get product(): ProductProps {
    return this.props.product
  }

  set product(prod: ProductProps) {
    this.props.product = prod
  }

  get quantity(): number {
    return this.props.quantity
  }

  set quantity(qtd: number) {
    this.props.quantity = qtd
  }

  edit({ productId, product, quantity }: InventoryItemProps) {
    this.props = { productId, product, quantity }
  }
}
