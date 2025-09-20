import { randomUUID } from 'crypto'
import { Balance } from 'src/utils/Balance'
import { PaymentProps } from 'src/utils/Payment'
import Decimal from 'decimal.js'

export enum CashRegisterState {
  OPEN,
  CLOSED,
}

export interface CashRegisterProps {
  balance: Balance
  state: CashRegisterState
  operatorId: string
  openedAt: Date
  closedAt: Date | null
  declaredCashClose: Decimal | null
}

export class CashRegister {
  private props: CashRegisterProps
  private _id: string

  constructor(props: CashRegisterProps, id?: string) {
    this.props = {
      ...props,
      closedAt: props.closedAt ?? null,
      declaredCashClose: props.declaredCashClose ?? null,
    } as CashRegisterProps

    this._id = id ?? randomUUID()
  }

  get id(): string {
    return this._id
  }

  get balance(): Balance {
    return this.props.balance
  }

  get state(): CashRegisterState {
    return this.props.state
  }

  get operatorId(): string {
    return this.props.operatorId
  }

  get openedAt(): Date {
    return this.props.openedAt
  }

  get closedAt(): Date | null {
    return this.props.closedAt
  }

  get declaredCashClose(): Decimal | null {
    return this.props.declaredCashClose
  }

  public close(amount: Decimal) {
    if (this.props.state === CashRegisterState.CLOSED) {
      throw new Error('[CASH REGISTER] Close: O Caixa já está fechado.')
    }

    this.props.state = CashRegisterState.CLOSED
    this.props.closedAt = new Date()
    this.props.declaredCashClose = amount
  }

  public deposit(payment: PaymentProps) {
    if (this.props.state === CashRegisterState.CLOSED) {
      throw new Error(
        '[CASH REGISTER] Deposit: Não foi possível efetuar o depósito. O caixa já está fechado.'
      )
    }
    this.props.balance[payment.type] = this.props.balance[payment.type]!.plus(
      payment.amount
    )
  }

  public withdraw(transaction: PaymentProps) {
    if (this.props.state === CashRegisterState.CLOSED) {
      throw new Error(
        '[CASH REGISTER] Withdraw: Não foi possível efetuar o saque. O caixa já está fechado.'
      )
    }

    if (this.props.balance[transaction.type]!.lt(transaction.amount)) {
      throw new Error(
        '[CASH REGISTER] Withdraw: Não foi possível efetuar o saque. Balanço insuficiente.'
      )
    }

    this.props.balance[transaction.type] = this.props.balance[
      transaction.type
    ]!.minus(transaction.amount)
  }
}
