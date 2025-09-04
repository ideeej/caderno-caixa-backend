import { randomUUID } from 'crypto'
import Decimal from 'decimal.js'
import { Product, ProductProps } from '../../product/product'

export interface NotaFiscalItemsProps {
  product: ProductProps
  quantity: Decimal
  total: Decimal
}

export class NotaFiscalItem {
  private props: NotaFiscalItemsProps
  private _id: string

  constructor(product: Product, quantity: Decimal, id?: string) {
    this.props = {
      product,
      quantity: quantity,
      total: product.price.times(quantity),
    }

    this._id = id || randomUUID()
  }

  get id(): string {
    return this._id
  }

  get product(): ProductProps {
    return this.props.product
  }

  get quantity(): Decimal {
    return this.props.quantity
  }

  get total(): Decimal {
    return this.props.product.price.times(this.props.quantity)
  }

  updateTotal() {
    this.props.total = this.props.product.price.times(this.props.quantity)
  }
}
