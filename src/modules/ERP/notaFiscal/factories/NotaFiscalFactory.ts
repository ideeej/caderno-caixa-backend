import {
  NotaFiscal,
  NotaFiscalProps,
  NotaFiscalState,
} from '../entities/NotaFiscal'

export const testNotaFiscalId = 'test_invoice_id'
export const testOperatorId = 'test_operator'
export const testRegisterId = 'test_register_id'

export const testNotaFiscal = {
  cashRegisterId: testRegisterId,
  operatorId: testOperatorId,
  payments: [],
  items: [],
  state: NotaFiscalState.OPEN,
  createdAt: new Date(),
  closedAt: null,
}

export const makeNotaFiscal = (
  props: Partial<NotaFiscalProps>,
  id?: string
) => {
  return new NotaFiscal(
    {
      ...testNotaFiscal,
      payments: [...testNotaFiscal.payments],
      items: [...testNotaFiscal.items],
      ...props,
    },
    id ?? testNotaFiscalId
  )
}
