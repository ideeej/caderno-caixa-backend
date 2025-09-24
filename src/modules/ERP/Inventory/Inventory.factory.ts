import { Inventory, InventoryProps } from './Inventory'
import { InventoryItem } from './InventoryItem'

export const makeInventory = (props: Partial<InventoryProps>, id?: string) => {
  return new Inventory(
    {
      items: new Map<string, InventoryItem>(),
      barcodeIndex: new Map<string, string>(),
      operations: [],
      ...props,
    },
    id
  )
}
