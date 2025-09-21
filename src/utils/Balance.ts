import { Money } from 'src/modules/ERP/Money/Money'

export interface Balance {
  cash: Money
  debit?: Money
  credit?: Money
  pix?: Money
  check?: Money
  onAccount?: Money
}
