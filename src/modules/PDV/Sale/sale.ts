import Decimal from 'decimal.js'
import { Entity } from 'src/modules/entity'
import { SaleItem } from './saleItem'
import { Client } from 'src/modules/ERP/Client/client'
import { Payment } from 'src/utils/payment'

export enum SaleState {
  CREATED = 'CREATED', // empty sale
  OPEN = 'OPEN', // Primeiro item adicionado
  CLOSED = 'CLOSED', // Venda fechada, mas ainda pode ser reaberta e editada
  CANCELLED = 'CANCELLED', // Venda cancelada
  FINISHED = 'FINISHED', // Não pode mais ser alterada
}

export interface SaleProps {
  items: SaleItem[]
  state: SaleState
  client?: Client | null
  payments: Payment[]
  openedAt: Date
  closedAt: Date | null
  cancelledAt: Date | null
  finishedAt: Date | null
}

export class Sale extends Entity<SaleProps> {
  constructor(props: SaleProps, id?: string) {
    super(props, id)
  }

  get state(): SaleState {
    return this.props.state
  }

  get openedAt(): Date {
    return this.props.openedAt
  }

  get closedAt(): Date | null {
    return this.props.closedAt
  }

  get cancelledAt(): Date | null {
    return this.props.cancelledAt
  }

  get finishedAt(): Date | null {
    return this.props.finishedAt
  }

  get items(): SaleItem[] {
    return this.props.items
  }

  get payments(): Payment[] {
    return this.props.payments
  }

  get total(): Decimal {
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
    const change = this.totalPaid.minus(this.total)
    return change.isNegative() ? Decimal(0) : change
  }

  get isFullyPaid(): boolean {
    return this.totalPaid.greaterThanOrEqualTo(this.total)
  }

  addItem(item: SaleItem) {
    if (this.props.state === SaleState.CREATED) {
      this.open()
    }

    if (this.props.state !== SaleState.OPEN) {
      throw new Error(
        'Não é possível adicionar itens. A venda não está aberta para edição de itens.'
      )
    }

    this.props.items.push(item)
  }

  removeByIndex(index: number): SaleItem[] {
    if (this.props.state !== SaleState.OPEN) {
      throw new Error(
        'Não é possível remover itens. A venda não está aberta para edição de itens.'
      )
    }
    return this.props.items.splice(index, 1)
  }

  removeById(id: string): SaleItem[] {
    if (this.props.state !== SaleState.OPEN) {
      throw new Error(
        'Não é possível remover itens. A venda não está aberta para edição de itens.'
      )
    }

    const indexToRemove = this.props.items.findIndex(item => item.id === id)
    return this.props.items.splice(indexToRemove, 1)
  }

  addPayment(payment: Payment) {
    if (this.props.state !== SaleState.CLOSED) {
      throw new Error(
        'Não é possível adicionar pagamentos. A venda deve estar fechada para edição de pagamentos.'
      )
    }

    this.props.payments.push(payment)

    if (this.isFullyPaid) {
      this.finish()
    }
  }

  open() {
    if (this.props.state === SaleState.FINISHED) {
      throw new Error('A venda está finalizada e não pode ser editada')
    }

    if (this.props.state === SaleState.OPEN) {
      throw new Error('A nota fiscal já está aberta.')
    }

    if (this.props.state == SaleState.CANCELLED) {
      throw new Error(
        'Esta venda já foi CANCELADA. Não pode ser reaberta nem alterada.'
      )
    }

    this.props.state = SaleState.OPEN
    this.props.openedAt = new Date()
  }

  close() {
    if (this.props.state === SaleState.FINISHED) {
      throw new Error('A venda está finalizada e não pode ser editada')
    }

    if (this.props.state == SaleState.CANCELLED) {
      throw new Error(
        'Esta venda já foi CANCELADA. Não pode ser fechada nem alterada.'
      )
    }

    if (this.props.state == SaleState.CLOSED) {
      throw new Error('A venda parece já estar fechada.')
    }

    if (this.props.items.length <= 0) {
      throw new Error('Erro ao fechar venda. Não há items.')
    }

    this.props.state = SaleState.CLOSED
    this.props.closedAt = new Date()
  }

  cancel() {
    if (this.props.state === SaleState.FINISHED) {
      throw new Error('A venda está finalizada e não pode ser editada')
    }
    if (this.props.state === SaleState.CANCELLED) {
      throw new Error('A venda está cancelada e não pode ser editada')
    }

    this.props.state = SaleState.CANCELLED
    this.props.cancelledAt = new Date()
  }

  finish() {
    if (this.props.state === SaleState.FINISHED) {
      throw new Error('A venda está finalizada e não pode ser editada')
    }

    if (this.props.state !== SaleState.CLOSED) {
      throw new Error(
        'A venda só pode ser finalizada se estiver fechada para edição.'
      )
    }

    if (!this.isFullyPaid) {
      throw new Error(
        'A venda só pode ser finalizada se o total pago for igual ou maior que o total da venda.'
      )
    }

    this.props.state = SaleState.FINISHED
    this.props.finishedAt = new Date()
  }
}
