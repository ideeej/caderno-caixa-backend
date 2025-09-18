import { randomUUID } from 'crypto'
import Decimal from 'decimal.js'

export enum PaymentType {
  CASH = 'cash',
  DEBIT = 'debit',
  CREDIT = 'credit',
  PIX = 'pix',
  CHECK = 'check',
  ONACCOUNT = 'onAccount',
}

export interface PaymentProps {
  type: PaymentType
  amount: Decimal
  createdAt?: Date
  observation?: string
}

export class Payment {
  private _id: string
  public props: PaymentProps

  constructor(props: PaymentProps, id?: string) {
    this._id = id || randomUUID()
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
    }
  }

  get id(): string {
    return this._id
  }

  get amount(): Decimal {
    return this.props.amount
  }

  get type(): PaymentType {
    return this.props.type
  }

  get createdAt(): Date {
    return this.props.createdAt || new Date()
  }
  get observation(): string {
    return this.props.observation || ''
  }
}
