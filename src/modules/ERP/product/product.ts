import { randomUUID } from 'crypto'
import Decimal from 'decimal.js'
import { SaleUnit } from 'src/utils/saleUnit'

export interface ProductDto {}

export interface ProductProps {
  barcode: string
  name: string
  saleUnit: SaleUnit
  price: Decimal
  unitValue: Decimal
}

export class Product {
  private props: ProductProps
  private _id: string

  constructor(props: ProductProps, id?: string) {
    this.props = props
    this._id = id || randomUUID()
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this.props.name
  }

  get barcode(): string {
    return this.props.barcode
  }

  get saleUnit(): SaleUnit {
    return this.props.saleUnit
  }

  get price(): Decimal {
    return this.props.price
  }

  get unitValue(): Decimal {
    return this.props.unitValue
  }
}
