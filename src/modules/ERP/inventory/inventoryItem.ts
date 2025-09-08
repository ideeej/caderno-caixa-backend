import { randomUUID } from 'crypto'
import { ProductProps } from '../product/product'

export interface inventoryItemProps {
  product: ProductProps
  quantity: number
}

export class InventoryItem {
  private props: inventoryItemProps
  private _id: string

  constructor(props: inventoryItemProps, id?: string) {
    this.props = { ...props }
    this._id = id ?? randomUUID()
  }

  get id(): string {
    return this._id
  }

  get product(): ProductProps {
    return this.props.product
  }

  set product(prod: ProductProps) {
    this.props.product = { ...prod }
  }

  get quantity(): number {
    return this.props.quantity
  }

  set quantity(qtd: number) {
    this.props.quantity = qtd
  }

  edit({ product, quantity }: inventoryItemProps) {
    this.props = { product, quantity }
  }
}
