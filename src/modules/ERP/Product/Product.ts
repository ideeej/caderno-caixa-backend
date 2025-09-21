import { Entity } from 'src/modules/entity'
import { MeasuringUnit } from 'src/modules/ERP/MeasuringUnit/MeasuringUnit'
import { PricingType } from 'src/utils/PricingType'
import { Barcode } from '../Barcode/Barcode'
import { Money } from '../Money/Money'

export interface ProductProps {
  name: string
  description: string
  barcode: Barcode
  price: Money
  pricingType: PricingType
  measure: MeasuringUnit
}

export class Product extends Entity<ProductProps> {
  constructor(props: ProductProps, id?: string) {
    super(props, id)
  }

  get name(): string {
    return this.props.name
  }

  get description(): string {
    return this.props.description
  }

  get barcode(): Barcode {
    return this.props.barcode
  }

  get price(): Money {
    return this.props.price
  }

  get measure(): MeasuringUnit {
    return this.props.measure
  }

  get pricingType(): PricingType {
    return this.props.pricingType
  }

  edit(props: ProductProps) {
    this.props = { ...props }
  }
}
