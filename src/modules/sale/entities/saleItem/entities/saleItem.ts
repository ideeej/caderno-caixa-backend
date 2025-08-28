import { randomUUID } from 'crypto'

export interface SaleItemProps {
  productId: string
  description: string
  unitType: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export class SaleItem {
  private props: SaleItemProps
  private _id: string

  constructor(props: SaleItemProps, id: string) {
    this.props = {
      ...props,
    }

    this._id = id ?? randomUUID()
  }

  get id(): string {
    return this._id
  }

  get productId(): string {
    return this.props.productId
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

  get quantity(): number {
    return this.props.quantity
  }

  get totalPrice(): number {
    return this.props.totalPrice
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

  set quantity(quantity: number) {
    this.props.quantity = quantity
  }

  set totalPrice(totalPrice: number) {
    this.props.totalPrice = totalPrice
  }
}
