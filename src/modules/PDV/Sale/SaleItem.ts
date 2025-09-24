import { Entity } from 'src/modules/entity'
import { Money } from 'src/modules/ERP/Money/Money'
import { ProductProps } from 'src/modules/ERP/Product/Product'

export interface SaleItemProps {
  productInfo: ProductProps
  quantity: number
  total: Money
}

export class SaleItem extends Entity<SaleItemProps> {
  constructor(props: SaleItemProps, id?: string) {
    super(props, id)
    this.updateTotal()
  }

  get productInfo(): ProductProps {
    return this.props.productInfo
  }

  get quantity(): number {
    return this.props.quantity
  }

  get total(): Money {
    return this.updateTotal()
  }

  addQuantity(quantity: number) {
    this.props.quantity += quantity
  }

  decreaseQuantity(quantity: number) {
    this.props.quantity -= quantity
  }

  updateTotal(): Money {
    return this.props.productInfo.price.multiply(this.props.quantity)
  }
}
