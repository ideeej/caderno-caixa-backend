import Decimal from 'decimal.js'

export interface Balance {
  cash: Decimal
  debit?: Decimal
  credit?: Decimal
  pix?: Decimal
  check?: Decimal
  onAccount?: Decimal
}
