import { makeOperator } from 'src/modules/operator/factories/makeOperator'
import {
  CashRegister,
  CashRegisterProps,
  CashRegisterState,
} from '../entities/CashRegister'
import { Balance } from 'src/utils/balance'

const defaultBalance: Balance = {
  cash: 0,
  debit: 0,
  credit: 0,
  pix: 0,
  check: 0,
  onAccount: 0,
}

const defaultOperatorId = 'default_operator'
const defaultRegisterId = 'default_register_id'

export const makeCashRegister = (
  props: Partial<CashRegisterProps>,
  id?: string
) => {
  const fakeOperator = makeOperator({})

  return new CashRegister(
    {
      balance: { ...defaultBalance, ...props.balance },
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
