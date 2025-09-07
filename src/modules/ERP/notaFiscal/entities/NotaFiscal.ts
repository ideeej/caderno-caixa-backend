import { randomUUID } from 'crypto'
import { Payment, PaymentProps } from 'src/utils/payment'
import { NotaFiscalItem } from './NotaFiscalItem'
import Decimal from 'decimal.js'

//Invoice ~ Nota fiscal

export enum NotaFiscalState {
  OPEN = 'OPEN',
  FINALIZING = 'FINALIZING',
  CLOSED = 'CLOSED',
}

export interface NotaFiscalProps {
  cashRegisterId: string
  operatorId: string
  payments: Payment[]
  items: NotaFiscalItem[]
  state: NotaFiscalState
  createdAt: Date
  closedAt: Date | null
}

export class NotaFiscal {
  private props: NotaFiscalProps
  private _id: string

  constructor(props: NotaFiscalProps, id?: string) {
    this.props = {
      ...props,
      state: props.state || NotaFiscalState.OPEN,
      createdAt: props.createdAt || new Date(),
    }

    this._id = id || randomUUID()
  }

  get id(): string {
    return this._id
  }

  get cashRegisterId(): string {
    return this.props.cashRegisterId
  }

  get operatorId(): string {
    return this.props.operatorId
  }

  get state(): NotaFiscalState {
    return this.props.state
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get closedAt(): Date | null {
    return this.props.closedAt
  }

  get payments(): Payment[] {
    return this.props.payments
  }

  get items(): NotaFiscalItem[] {
    return this.props.items
  }

  get subtotal(): Decimal {
    return this.props.items.reduce(
      (total, item) => total.plus(item.total),
      Decimal('0')
    )
  }

  get totalPaid(): Decimal {
    return this.props.payments.reduce(
      (total, payment) => total.plus(payment.amount),
      Decimal('0')
    )
  }

  get change(): Decimal {
    return this.subtotal.minus(this.totalPaid).abs()
  }

  addItem(item: NotaFiscalItem) {
    if (this.props.state !== NotaFiscalState.OPEN) {
      throw new Error(
        'Não é possível adicionar itens. A nota fiscal não está aberta para edição de itens.'
      )
    }
    this.props.items.push(item)
  }

  removeByIndex(index: number): NotaFiscalItem[] {
    if (this.props.state !== NotaFiscalState.OPEN) {
      throw new Error(
        'Não é possível remover itens. A nota fiscal não está aberta para edição de itens.'
      )
    }
    return this.props.items.splice(index, 1)
  }

  removeById(id: string): NotaFiscalItem[] {
    if (this.props.state !== NotaFiscalState.OPEN) {
      throw new Error(
        'Não é possível remover itens. A nota fiscal não está aberta para edição de itens.'
      )
    }

    const indexToRemove = this.props.items.findIndex(item => item.id === id)
    return this.props.items.splice(indexToRemove, 1)
  }

  removeItemsByIds(ids: string[]): NotaFiscalItem[] {
    if (this.props.state !== NotaFiscalState.OPEN) {
      throw new Error(
        'Não é possível remover itens. A nota fiscal não está aberta para edição de itens.'
      )
    }

    ids.forEach(idToRemove => {
      this.props.items = this.props.items.filter(item => item.id !== idToRemove)
    })

    return this.props.items
  }

  addPayment({ amount, type }: PaymentProps) {
    if (this.props.state !== NotaFiscalState.FINALIZING) {
      throw new Error(
        'Não é possível adicionar pagamentos. A nota fiscal não está em modo de finalização.'
      )
    }
    this.props.payments.push(new Payment({ amount, type }))
  }

  cancelPayment(index: number): Payment {
    if (this.props.state !== NotaFiscalState.FINALIZING) {
      throw new Error(
        'Não é possível cancelar pagamentos. A nota fiscal não está em modo de finalização.'
      )
    }
    return this.props.payments.splice(index, 1)[0]
  }

  finalize() {
    if (this.props.state !== NotaFiscalState.OPEN) {
      throw new Error(
        'A nota fiscal já está em processo de finalização ou já está fechada.'
      )
    }
    this.props.state = NotaFiscalState.FINALIZING
  }

  close() {
    if (this.props.state !== NotaFiscalState.FINALIZING) {
      throw new Error(
        'A nota fiscal não está em processo de finalização. Não há pagamentos para fechar essa nota fiscal.'
      )
    }
    this.props.state = NotaFiscalState.CLOSED
    this.props.closedAt = new Date()
  }

  revertToOpen() {
    if (this.props.state === NotaFiscalState.CLOSED) {
      throw new Error('A nota fiscal já foi fechada.')
    }

    if (this.props.state === NotaFiscalState.FINALIZING) {
      this.props.state = NotaFiscalState.OPEN
      this.props.payments = []
    }
  }
}
