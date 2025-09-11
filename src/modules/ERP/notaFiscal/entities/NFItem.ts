import Decimal from 'decimal.js'

import { Entity } from 'src/modules/entity'

import { ProductProps } from '../../product/product'

export interface NFItemProps {
  product: ProductProps
  quantity: Decimal
  total: Decimal
}

export class NFItem extends Entity<NFItemProps> {
  constructor(props: NFItemProps, id?: string) {
    super(props, id)
    this.updateTotal()
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
