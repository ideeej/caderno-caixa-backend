import { Sale, SaleProps, SaleState } from './sale'

export const NFID = 'NF_TEST_ID'

export const TEST_SALE = {
  items: [],
  state: SaleState.CREATED,
  client: null,
  payments: [],
  openedAt: new Date(),
  closedAt: null,
  cancelledAt: null,
  finishedAt: null,
}

export const makeSale = (props: Partial<SaleProps>, id?: string) => {
  return new Sale(
    {
      ...TEST_SALE,
      items: [...TEST_SALE.items],
      payments: [...TEST_SALE.payments],
      ...props,
    },
    id ?? NFID
  )
}
