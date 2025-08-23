import { randomUUID } from 'crypto'
import { Replace } from 'src/utils/replace'

interface CashRegisterProps {
  userId: string
  openedAt: Date
  closedAt?: Date | null
  initialAmount: Number
  closingAmount?: Number | null
  isOpen: Boolean
}

export class CashRegister {
  private props: CashRegisterProps
  private _id: string

  constructor(
    props: Replace<
      CashRegisterProps,
      { closedAt?: Date | null; closingAmount?: Number | null }
    >,
    id?: string
  ) {
    this.props = {
      ...props,
      closedAt: props.closedAt ?? null,
      closingAmount: props.closingAmount ?? null,
    }

    this._id = id || randomUUID()
  }
  get id(): string {
    return this._id
  }

  get userId(): string {
    return this.props.userId
  }

  get openedAt(): Date {
    return this.props.openedAt
  }

  get closedAt(): Date | null | undefined {
    return this.props.closedAt
  }

  set closedAt(closedAtDate: Date) {
    this.props.closedAt = closedAtDate
  }

  get initialAmount(): Number {
    return this.props.initialAmount
  }

  set initialAmount(initialAmount: Number) {
    this.props.initialAmount = initialAmount
  }

  get closingAmount(): Number | null | undefined {
    return this.props.closingAmount
  }

  set closingAmount(closingAmount: Number) {
    this.props.closingAmount = closingAmount
  }

  get isOpen(): Boolean {
    return this.props.isOpen
  }

  set isOpen(isOpen: Boolean) {
    this.props.isOpen = isOpen
  }
}
