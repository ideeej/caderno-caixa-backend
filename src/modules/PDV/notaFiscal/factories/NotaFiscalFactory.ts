import { Invoice, InvoiceProps, InvoiceState } from '../entities/NotaFiscal'

export const testInvoiceId = 'test_invoice_id'
export const testOperatorId = 'test_operator'
export const testRegisterId = 'test_register_id'

export const testInvoice = {
  cashRegisterId: testRegisterId,
  operatorId: testOperatorId,
  payments: [],
  items: [],
  state: InvoiceState.OPEN,
  createdAt: new Date(),
  closedAt: null,
}

export const makeInvoice = (props: Partial<InvoiceProps>, id?: string) => {
  return new Invoice(
    {
      ...testInvoice, // Default if no props are provided for override
      payments: [...testInvoice.payments],
      items: [...testInvoice.items],
      ...props,
    },
    id ?? testInvoiceId
  )
}
