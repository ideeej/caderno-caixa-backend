import { InventoryItem } from './inventoryItem'
import { Entity } from 'src/modules/entity'
import { InventoryOperation, OperationType } from './InventoryOperation'

export interface InventoryProps {
  items: Map<string, InventoryItem>
  operationHistory: InventoryOperation[]
}

export class Inventory extends Entity<InventoryProps> {
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
    // 1. Registra a operação de entrada
    const operation = new InventoryOperation({
      type: OperationType.ENTRADA,
      productId: inventoryItem.productId,
      quantity: inventoryItem.quantity,
      date: new Date(),
    })

    this.props.operationHistory.push(operation)

    // 2. Cria o item no inventário (ou atualiza)
    const itemToUpdate = new InventoryItem({
      productId: inventoryItem.productId,
      product: inventoryItem.product,
      quantity: updatedQuantity,
    })
    this.props.items.set(inventoryItem.productId, itemToUpdate)
  }

  removeItems(productId: string, quantity: number) {
    const existingItem = this.getItemById(productId)

    if (!existingItem) {
      throw new Error('Item não foi encontrado no inventário.')
    }

    if (existingItem.quantity < quantity) {
      throw new Error('Não temos produto suficiente em estoque.')
    }

    const updatedQuantity = existingItem.quantity - quantity

    if (updatedQuantity === 0) {
      this.props.items.delete(productId)
      // 1. Registra a operação de saída
      const operation = new InventoryOperation({
        type: OperationType.SAIDA,
        productId: productId,
        quantity: quantity,
        date: new Date(),
      })
      this.props.operationHistory.push(operation)
      return
    }

    if (updatedQuantity < 0) {
      throw new Error('A quantidade a ser removida é maior que a disponível.')
    }

    // 1. Registra a operação de saída
    const operation = new InventoryOperation({
      type: OperationType.SAIDA,
      productId: productId,
      quantity: quantity,
      date: new Date(),
    })
    this.props.operationHistory.push(operation)

    // 2. Atualiza o item no inventário
    const itemToUpdate = new InventoryItem({
      productId: existingItem.productId,
      product: existingItem.product,
      quantity: updatedQuantity,
    })
    return this.props.items.set(productId, itemToUpdate)
  }
}
