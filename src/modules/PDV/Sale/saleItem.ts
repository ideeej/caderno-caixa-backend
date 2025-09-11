import Decimal from 'decimal.js'
import { Entity } from 'src/modules/entity'
import { ProductProps } from 'src/modules/ERP/product/product'

export interface SaleItemProps {
  productInfo: ProductProps
  quantity: Decimal
  total: Decimal
}

export class SaleItem extends Entity<SaleItemProps> {
  constructor(props: SaleItemProps, id?: string) {
    super(props, id)
    this.updateTotal()
  }

  get productInfo(): ProductProps {
    return this.props.productInfo
  }

  get quantity(): Decimal {
    return this.props.quantity
  }

  get total(): Decimal {
    return this.props.productInfo.price.times(this.props.quantity)
  }

  updateTotal() {
    this.props.total = this.props.productInfo.price.times(this.props.quantity)
  }
}
