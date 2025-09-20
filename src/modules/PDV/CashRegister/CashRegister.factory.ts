import {
  CashRegister,
  CashRegisterProps,
  CashRegisterState,
} from './CashRegister'
import { Balance } from 'src/utils/Balance'
import Decimal from 'decimal.js'

const defaultBalance: Balance = {
  cash: Decimal('0'),
  debit: Decimal('0'),
  credit: Decimal('0'),
  pix: Decimal('0'),
  check: Decimal('0'),
  onAccount: Decimal('0'),
}

const defaultOperatorId = 'default_operator'
const defaultRegisterId = 'default_register_id'

export const makeCashRegister = (
  props: Partial<CashRegisterProps>,
  id?: string
) => {
  return new CashRegister(
    {
      balance: {
        ...defaultBalance,
        ...props.balance,
      },
      state: props.state ?? CashRegisterState.OPEN,
      operatorId: props.operatorId ?? defaultOperatorId,
      openedAt: props.openedAt ?? new Date(),
      closedAt: props.closedAt ?? null,
      declaredCashClose: props.declaredCashClose ?? null,
      ...props,
    },
    id ?? defaultRegisterId
  )
}
