import Decimal from 'decimal.js'

import { Entity } from 'src/modules/entity'

import { Payment, PaymentProps } from 'src/utils/payment'
import { NF, NFState } from '../NF/NF'
import { NFItem } from '../NFItem'

export interface NFCProps {
  notaFiscal: NF
  cashRegisterId: string
  operatorId: string
  paymentStarted: boolean
  payments: Payment[]
}

export class NFC extends Entity<NFCProps> {
  constructor(props: NFCProps, id?: string) {
    super(props, id)
  }

  get cashRegisterId(): string {
    return this.props.cashRegisterId
  }

  get operatorId(): string {
    return this.props.operatorId
  }

  get openedAt(): Date {
    return this.props.notaFiscal.openedAt
  }

  get closedAt(): Date | null {
    return this.props.notaFiscal.closedAt
  }

  get payments(): Payment[] {
    return this.props.payments
  }

  get items(): NFItem[] {
    return this.props.notaFiscal.items
  }

  get subtotal(): Decimal {
    return this.props.notaFiscal.subtotal
  }

  get totalPaid(): Decimal {
    return this.props.payments.reduce(
      (total, payment) => total.plus(payment.amount),
      Decimal('0')
    )
  }

  get paymentStarted(): boolean {
    return this.props.paymentStarted
  }

  get change(): Decimal {
    return this.subtotal.minus(this.totalPaid).abs()
  }

  get notaFiscal(): NF {
    return this.props.notaFiscal
  }

  addItem(item: NFItem) {
    if (this.props.paymentStarted) {
      throw new Error(
        'Não é possível adicionar itens. A nota fiscal não está aberta para edição de itens.'
      )
    }
    this.props.notaFiscal.addItem(item)
  }

  removeByIndex(index: number): NFItem[] {
    if (this.props.notaFiscal.state !== NFState.OPEN) {
      throw new Error(
        'Não é possível remover itens. A nota fiscal não está aberta para edição de itens.'
      )
    }
    return this.props.notaFiscal.removeByIndex(index)
  }

  removeById(id: string): NFItem[] {
    if (this.props.notaFiscal.state !== NFState.OPEN) {
      throw new Error(
        'Não é possível remover itens. A nota fiscal não está aberta para edição de itens.'
      )
    }

    return this.props.notaFiscal.removeById(id)
  }

  addPayment({ amount, type }: PaymentProps) {
    if (!this.props.paymentStarted) {
      throw new Error(
        'Não é possível adicionar pagamentos. A nota fiscal não está em modo de finalização.'
      )
    }
    this.props.payments.push(new Payment({ amount, type }))
  }

  cancelPayment(index: number): Payment {
    if (!this.props.paymentStarted) {
      throw new Error(
        'Não é possível cancelar pagamentos. A nota fiscal não está em modo de finalização.'
      )
    }
    return this.props.payments.splice(index, 1)[0]
  }

  startPayment() {
    if (
      this.props.paymentStarted ||
      this.props.notaFiscal.state !== NFState.OPEN
    ) {
      throw new Error(
        'A nota fiscal já está em processo de finalização ou já está fechada.'
      )
    }
    this.props.paymentStarted = true
  }

  close() {
    if (!this.props.paymentStarted) {
      throw new Error(
        'A nota fiscal não está em processo de finalização. Não há pagamentos para fechar essa nota fiscal.'
      )
    }
    this.props.notaFiscal.close()
  }

  revertToOpen() {
    if (this.props.paymentStarted) {
      this.props.notaFiscal.open()
      this.props.payments = []
      this.props.paymentStarted = false
    }
  }
}
