import { Money } from 'src/modules/ERP/Money/Money'
import {
  CashRegister,
  CashRegisterProps,
  CashRegisterState,
} from './CashRegister'
import { Balance } from 'src/utils/Balance'

const defaultBalance: Balance = {
  cash: new Money('0'),
  debit: new Money('0'),
  credit: new Money('0'),
  pix: new Money('0'),
  check: new Money('0'),
  onAccount: new Money('0'),
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
