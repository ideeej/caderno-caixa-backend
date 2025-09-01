import { randomUUID } from 'crypto'
import Decimal from 'decimal.js'
import { SaleUnit } from 'src/utils/saleUnit'

export interface ProductProps {
  barcode: string
  name: string
  saleUnit: SaleUnit
  unitPrice: Decimal
  unitValue: Decimal
}

export class ProductItem {
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

  get unitPrice(): Decimal {
    return this.props.unitPrice
  }

  get unitValue(): Decimal {
    return this.props.unitValue
  }
}
