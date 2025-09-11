import { makeNF } from '../NF/NF.factory'
import { NFC, NFCProps } from './NFC'

export const NFID = 'test_invoice_id'
export const OPERATOR_ID = 'test_operator'
export const REGISTER_ID = 'test_register_id'

export const TEST_NFC = {
  notaFiscal: makeNF({}),
  cashRegisterId: REGISTER_ID,
  operatorId: OPERATOR_ID,
  payments: [],
  paymentStarted: false,
  openedAt: new Date(),
  closedAt: null,
}

export const makeNFC = (props: Partial<NFCProps>, id?: string) => {
  return new NFC(
    {
      ...TEST_NFC,
      notaFiscal: makeNF({}),
      payments: [],
      ...props,
    },
    id ?? NFID
  )
}
