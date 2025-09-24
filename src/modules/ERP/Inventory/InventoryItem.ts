import { Entity } from 'src/modules/entity'
import { Barcode } from '../Barcode/Barcode'

export interface InventoryItemProps {
  productBarcode: Barcode
  quantity: number
}

export class InventoryItem extends Entity<InventoryItemProps> {
  constructor(props: InventoryItemProps, id?: string) {
    super(props, id)
  }

  get productBarcode(): Barcode {
    return this.props.productBarcode
  }

  get quantity(): number {
    return this.props.quantity
  }

  addQuantity(quantity: number) {
    this.props.quantity += quantity
    this.updateTimestamp()
  }

  removeQuantity(quantity: number) {
    this.props.quantity -= quantity
    this.updateTimestamp()
  }

  updateProduct(product: Barcode) {
    this.props.productBarcode = product
    this.updateTimestamp()
  }
}
