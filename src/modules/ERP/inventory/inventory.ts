import { randomUUID } from 'crypto'
import { InventoryItem, inventoryItemProps } from './inventoryItem'

export interface InventoryProps {
  items: Map<string, InventoryItem>
}

export class Inventory {
  private props
  private _id

  constructor(props: InventoryProps, id?: string) {
    this.props = { ...props }
    this._id = id ?? randomUUID()
  }

  get id(): string {
    return this._id
  }

  get items(): Map<string, InventoryItem> {
    return this.props.items
  }

  getItem(barcode: string): InventoryItem | null {
    return this.props.items.get(barcode) ?? null
  }

  addItem(inventoryItem: InventoryItem) {
    const existingItem: InventoryItem = this.props.items.get(
      inventoryItem.product.barcode
    )

    if (existingItem) {
      const updatedItem = new InventoryItem({
        product: inventoryItem.product,
        quantity: inventoryItem.quantity + existingItem.quantity,
      })
      this.props.items.set(inventoryItem.product.barcode, updatedItem)
    } else {
      this.props.items.set(inventoryItem.product.barcode, inventoryItem)
    }
  }

  editItem(originalItem: InventoryItem, updatedItem: InventoryItem) {
    const originalBarcode = originalItem.product.barcode
    const updatedBarcode = updatedItem.product.barcode

    if (originalBarcode === updatedBarcode) {
      this.props.items.set(originalBarcode, updatedItem)
    } else {
      // We can just edit normally
      this.deleteItem(originalItem)
      this.props.items.set(updatedBarcode, updatedItem)
    }

    this.props.items.set(updatedBarcode, updatedItem)
  }

  deleteItem(itemToRemove: InventoryItem) {
    this.props.items.delete(itemToRemove.product.barcode)
  }
}
