import { Inventory, InventoryProps } from './inventory'
import { InventoryItem } from './inventoryItem'

export const makeInventory = (props: Partial<InventoryProps>, id?: string) => {
  return new Inventory(
    {
      ...props,
      items: new Map<string, InventoryItem>(),
      operationHistory: [],
    },
    id
  )
}
