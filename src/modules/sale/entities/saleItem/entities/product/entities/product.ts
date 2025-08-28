import { randomUUID } from 'crypto'

interface ProductProps {
  name: string
  details: string
  description: string
  unitPrice: number
  unitType: string
}

export class Product {
  private props: ProductProps
  private _id: string

  constructor(props: Partial<ProductProps>, id?: string) {
    this.props = {
      ...props,
      name: 'Novo produto',
      details: '',
      description: 'Novo produto',
      unitPrice: 1,
      unitType: 'un',
    } as ProductProps

    this._id = id || randomUUID()
  }

  get name(): string {
    return this.props.name
  }

  get details(): string {
    return this.props.details
  }

  get description(): string {
    return this.props.description
  }

  get unitPrice(): number {
    return this.props.unitPrice
  }

  get unitType(): string {
    return this.props.unitType
  }

  set name(name: string) {
    this.props.name = name
  }
  set details(details: string) {
    this.props.details = details
  }
  set description(description: string) {
    this.props.description = description
  }
  set unitPrice(unitPrice: number) {
    this.props.unitPrice = unitPrice
  }
  set unitType(unitType: string) {
    this.props.unitType = unitType
  }
}
