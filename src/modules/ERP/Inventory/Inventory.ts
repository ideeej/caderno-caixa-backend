import { Entity } from 'src/modules/entity'
import { InventoryItem } from './InventoryItem'
import { InventoryOperation, OperationType } from './InventoryOperation'
import { makeInventoryItem } from './InventoryItem.factory'
import { Barcode } from '../Barcode/Barcode'

export interface InventoryProps {
  items: Map<string, InventoryItem>
  barcodeIndex: Map<string, string>
  allowNegativeStock?: boolean
  operations: InventoryOperation[]
}

export class Inventory extends Entity<InventoryProps> {
  constructor(props: InventoryProps, id?: string) {
    super(props, id)
  }

  get items(): Map<string, InventoryItem> {
    return this.props.items
  }

  get operations(): InventoryOperation[] {
    return this.props.operations
  }

  get barcodeIndex(): Map<string, string> {
    return this.props.barcodeIndex
  }

  findByBarcode(barcode: Barcode): InventoryItem | null {
    const itemId = this.props.barcodeIndex.get(barcode.value)
    if (!itemId) {
      return null
    }
    return this.props.items.get(itemId) ?? null
  }

  addItem(productBarcode: Barcode, quantity: number = 1) {
    const existingItemId = this.props.barcodeIndex.get(productBarcode.value)

    if (!existingItemId) {
      const inventoryItem = makeInventoryItem({ productBarcode, quantity })
      this.props.items.set(inventoryItem.id, inventoryItem)
      this.props.barcodeIndex.set(productBarcode.value, inventoryItem.id)
      return
    }

    const existingItem = this.props.items.get(existingItemId)
    if (existingItem) {
      existingItem.addQuantity(quantity)
    }
  }

  removeItem(barcode: Barcode, quantity: number = 1) {
    const itemId = this.props.barcodeIndex.get(barcode.value)
    if (!itemId) {
      throw new Error('Could not remove Item, no product with barcode found.')
    }

    const existingItem = this.props.items.get(itemId)
    if (!existingItem) {
      throw new Error('Internal Error: Indexed item not found.')
    }

    if (
      existingItem.quantity - quantity < 0 &&
      !this.props.allowNegativeStock
    ) {
      throw new Error(
        'Estoque negativo não permitido. Não há estoque suficiente'
      )
    }
    existingItem.removeQuantity(quantity)

    if (existingItem.quantity <= 0) {
      this.deleteItem(barcode)
    }
  }

  deleteItem(barcode: Barcode) {
    const itemId = this.props.barcodeIndex.get(barcode.value)
    if (!itemId) {
      return
    }

    this.props.barcodeIndex.delete(barcode.value)
    this.props.items.delete(itemId)
  }

  performEntry(productBarcode: Barcode, quantity: number) {
    this.addItem(productBarcode, quantity)
    this.props.operations.push(
      new InventoryOperation({
        type: OperationType.ENTRADA,
        productId: productBarcode.value,
        quantity,
        date: new Date(),
        description: 'Operação de entrada (compra)',
      })
    )
  }

  performSale(productBarcode: Barcode, quantity: number) {
    this.removeItem(productBarcode, quantity)
    this.props.operations.push(
      new InventoryOperation({
        type: OperationType.SAIDA,
        productId: productBarcode.value,
        quantity,
        date: new Date(),
        description: 'Operação de saída (venda)',
      })
    )
  }

  performConsume(productBarcode: Barcode, quantity: number) {
    this.removeItem(productBarcode, quantity)
    this.props.operations.push(
      new InventoryOperation({
        type: OperationType.CONSUMO,
        productId: productBarcode.value,
        quantity,
        date: new Date(),
        description: 'Operação de consumo',
      })
    )
  }
}
