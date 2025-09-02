import { randomUUID } from 'crypto'
import Decimal from 'decimal.js'
import { ProductItem, ProductItemProps } from 'src/utils/productItem'

export interface InvoiceItemProps {
  product: ProductItemProps
  quantity: Decimal
  total: Decimal
}

export class InvoiceItem {
  private props: InvoiceItemProps
  private _id: string

  constructor(product: ProductItem, quantity: Decimal, id?: string) {
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

  get product(): ProductItemProps {
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
