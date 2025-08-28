import { randomUUID } from 'crypto'
import { SaleItem } from './saleItem/entities/saleItem'
import { SalePaymentDto } from '../dtos/SalePaymentDTO'
import { SaleItemDto } from '../dtos/SaleItemDTO'
import { Transaction } from 'src/utils/transaction'

interface SaleProps {
  cashRegisterId: string
  payments: Transaction[]
  items: SaleItem[]
  closedAt: Date | null
}

export class Sale {
  private props: SaleProps
  private _id: string

  constructor(props: SaleProps, id?: string) {
    this.props = {
      ...props,
    }

    this._id = id || randomUUID()
  }

  get id(): string {
    return this._id
  }

  get cashRegisterId(): string {
    return this.props.cashRegisterId
  }

  get closedAt(): Date | null {
    return this.props.closedAt
  }

  get payments(): Transaction[] {
    return this.props.payments
  }

  addTransaction({ amount, type }: Transaction) {
    this.props.payments.push({ amount, type })
  }

  get items(): SaleItem[] {
    return this.props.items
  }
}
