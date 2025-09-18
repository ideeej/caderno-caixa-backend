import { InventoryItem } from './inventoryItem'
import { Entity } from 'src/modules/entity'
import { InventoryOperation, OperationType } from './InventoryOperation'

export interface InventoryProps {
  items: Map<string, InventoryItem>
  operationHistory: InventoryOperation[]
}

export class Inventory extends Entity<InventoryProps> {
  allowNegativeStock = true // Para testes

  constructor(props: InventoryProps, id?: string) {
    super(props, id)
  }

  get operationHistory(): InventoryOperation[] {
    return this.props.operationHistory
  }

  get items(): Map<string, InventoryItem> {
    return this.props.items
  }

  getItemById(productId: string): InventoryItem | null {
    return this.props.items.get(productId) ?? null
  }

  addItems(inventoryItem: InventoryItem) {
    const existingItem: InventoryItem | null = this.getItemById(
      inventoryItem.productId
    )

    let updatedQuantity = inventoryItem.quantity

    if (updatedQuantity <= 0) {
      throw new Error('A quantidade a ser adicionada deve ser maior que zero.')
    }

    if (existingItem) {
      updatedQuantity += existingItem.quantity
    }

    const operation = new InventoryOperation({
      type: OperationType.ENTRADA,
      productId: inventoryItem.productId,
      quantity: inventoryItem.quantity,
      date: new Date(),
    })

    this.props.operationHistory.push(operation)

    const newItem = new InventoryItem({
      productId: inventoryItem.productId,
      product: inventoryItem.product,
      quantity: updatedQuantity,
    })

    this.props.items.set(inventoryItem.productId, newItem)
  }

  removeItems(productId: string, quantity: number, type?: OperationType) {
    const existingItem: InventoryItem | null = this.getItemById(productId)

    if (!existingItem) {
      throw new Error('Item não foi encontrado no inventário.')
    }

    if (!this.allowNegativeStock && existingItem.quantity < quantity) {
      throw new Error('Não temos produto suficiente em estoque.')
    }

    existingItem.quantity -= quantity

    const operation = new InventoryOperation({
      type: type || OperationType.SAIDA,
      productId: productId,
      quantity: quantity,
      date: new Date(),
    })

    this.props.operationHistory.push(operation)

    const itemToUpdate = new InventoryItem({
      productId: existingItem.productId,
      product: existingItem.product,
      quantity: existingItem.quantity,
    })
    return this.props.items.set(productId, itemToUpdate)
  }
}
