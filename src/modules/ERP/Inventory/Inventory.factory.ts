import { Inventory, InventoryProps } from './Inventory'
import { InventoryItem } from './InventoryItem'

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
