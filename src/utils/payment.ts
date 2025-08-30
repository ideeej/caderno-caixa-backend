import { randomUUID } from 'crypto'
import { PaymentType } from './paymentType'
import Decimal from 'decimal.js'

export interface PaymentProps {
  type: PaymentType
  amount: Decimal
}

export class Payment {
  private _id: string
  public props: PaymentProps

  constructor({ type, amount }: PaymentProps, id?: string) {
    this._id = id || randomUUID()
    this.props = {
      type,
      amount,
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
}
