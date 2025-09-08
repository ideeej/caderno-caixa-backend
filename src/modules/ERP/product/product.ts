import { randomUUID } from 'crypto'
import Decimal from 'decimal.js'
import { MeasuringUnit } from 'src/utils/measuringUnit'
import { PricingType } from 'src/utils/pricingType'

export interface ProductProps {
  barcode: string
  name: string
  description: string
  price: Decimal
  pricingType: PricingType
  measuringUnit: MeasuringUnit
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

  get description(): string {
    return this.props.description
  }

  get barcode(): string {
    return this.props.barcode
  }

  get price(): Decimal {
    return this.props.price
  }

  get measuringUnit(): MeasuringUnit {
    return this.props.measuringUnit
  }

  get pricingType(): PricingType {
    return this.props.pricingType
  }

  edit(props: ProductProps) {
    this.props = { ...props }
  }
}
