import Decimal from 'decimal.js'

import { Entity } from 'src/modules/entity'

import { NFItem } from '../NFItem'

export enum NFState {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export enum NFType {
  CUSTOMER,
  SALE,
  PURCHASE,
  CONSUMPTION,
}

export interface NFProps {
  items: NFItem[]
  state: NFState
  type: NFType
  openedAt: Date
  closedAt: Date | null
}

export class NF extends Entity<NFProps> {
  constructor(props: NFProps, id?: string) {
    super(props, id)
  }

  get state(): NFState {
    return this.props.state
  }

  get type(): NFType {
    return this.props.type
  }

  get openedAt(): Date {
    return this.props.openedAt
  }

  get closedAt(): Date | null {
    return this.props.closedAt
  }

  get items(): NFItem[] {
    return this.props.items
  }

  get subtotal(): Decimal {
    return this.props.items.reduce(
      (total, item) => total.plus(item.total),
      Decimal('0')
    )
  }

  open() {
    // TODO TEST
    if (this.props.state === NFState.CLOSED) {
      throw new Error('A nota fiscal está fechada.')
    }
    this.props.state = NFState.OPEN
    this.props.openedAt = new Date()
  }

  close() {
    if (this.props.state !== NFState.OPEN) {
      throw new Error('A nota fiscal parece já estar fechada.')
    }
    this.props.state = NFState.CLOSED
    this.props.closedAt = new Date()
  }

  addItem(item: NFItem) {
    if (this.props.state !== NFState.OPEN) {
      throw new Error(
        'Não é possível adicionar itens. A nota fiscal não está aberta para edição de itens.'
      )
    }
    this.props.items.push(item)
  }

  removeByIndex(index: number): NFItem[] {
    if (this.props.state !== NFState.OPEN) {
      throw new Error(
        'Não é possível remover itens. A nota fiscal não está aberta para edição de itens.'
      )
    }
    return this.props.items.splice(index, 1)
  }

  removeById(id: string): NFItem[] {
    if (this.props.state !== NFState.OPEN) {
      throw new Error(
        'Não é possível remover itens. A nota fiscal não está aberta para edição de itens.'
      )
    }

    const indexToRemove = this.props.items.findIndex(item => item.id === id)
    return this.props.items.splice(indexToRemove, 1)
  }
}
