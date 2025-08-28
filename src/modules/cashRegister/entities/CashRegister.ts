import { randomUUID } from 'crypto'
import { Balance } from '../../../utils/balance'
import { Transaction } from 'src/utils/transaction'

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
  declaredCashClose: number | null
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

  get declaredCashClose(): number | null {
    return this.props.declaredCashClose
  }

  public close(amount: number) {
    if (this.props.state === CashRegisterState.CLOSED) {
      throw new Error('[CASH REGISTER] Close: O Caixa já está fechado.')
    }

    this.props.state = CashRegisterState.CLOSED
    this.props.closedAt = new Date()
    this.props.declaredCashClose = amount
  }

  public deposit(transaction: Transaction) {
    if (this.props.state === CashRegisterState.CLOSED) {
      throw new Error(
        '[CASH REGISTER] Deposit: Não foi possível efetuar o depósito. O caixa já está fechado.'
      )
    }

    this.props.balance[transaction.type] += transaction.amount
  }

  public withdraw(transaction: Transaction) {
    if (this.props.state === CashRegisterState.CLOSED) {
      throw new Error(
        '[CASH REGISTER] Withdraw: Não foi possível efetuar o saque. O caixa já está fechado.'
      )
    }

    if (this.props.balance[transaction.type]! < transaction.amount) {
      throw new Error(
        '[CASH REGISTER] Withdraw: Não foi possível efetuar o saque. Balanço insuficiente.'
      )
    }

    this.props.balance[transaction.type] -= transaction.amount
  }
}
