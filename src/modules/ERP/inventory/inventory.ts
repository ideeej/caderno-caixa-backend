import { InventoryItem } from './inventoryItem'
import { Entity } from 'src/modules/entity'

export interface InventoryProps {
  items: Map<string, InventoryItem>
}

export class Inventory extends Entity<InventoryProps> {
  constructor(props: InventoryProps, id?: string) {
    super(props, id)
  }

  get items(): Map<string, InventoryItem> {
    return this.props.items
  }

  getItem(barcode: string): InventoryItem | null {
    return this.props.items.get(barcode) ?? null
  }

  addItem(inventoryItem: InventoryItem) {
    const existingItem: InventoryItem | undefined = this.props.items.get(
      inventoryItem.product.barcode
    )

    if (!existingItem) {
      return this.props.items.set(inventoryItem.product.barcode, inventoryItem)
    }

    const updatedItem = new InventoryItem({
      product: inventoryItem.product,
      quantity: inventoryItem.quantity + existingItem.quantity,
    })
    this.props.items.set(inventoryItem.product.barcode, updatedItem)
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
