import { Entity } from 'src/modules/entity'

export enum OperationType {
  ENTRADA = 'ENTRADA',
  SAIDA = 'SAIDA',
  CONSUMO = 'CONSUMO',
}

export interface InventoryOperationProps {
  type: OperationType
  productId: string
  quantity: number
  date: Date
  description?: string
  // notaFiscalId?: string;
}

export class InventoryOperation extends Entity<InventoryOperationProps> {
  constructor(props: InventoryOperationProps, id?: string) {
    super(props, id)
  }

  get type(): OperationType {
    return this.props.type
  }

  get productId(): string {
    return this.props.productId
  }

  get quantity(): number {
    return this.props.quantity
  }
}
