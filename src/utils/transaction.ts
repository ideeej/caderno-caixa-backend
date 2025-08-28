import { TransactionType } from './transactionType'

export interface Transaction {
  type: TransactionType
  amount: number
}
