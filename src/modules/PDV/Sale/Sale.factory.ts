import { makeInventory } from 'src/modules/ERP/Inventory/Inventory.factory'
import { Sale, SaleProps, SaleState } from './Sale'

export const NFID = 'NF_TEST_ID'

export const TEST_SALE = {
  items: [],
  payments: [],
  inventory: makeInventory({}),
  state: SaleState.CREATED,
  openedAt: new Date(),
  client: null,
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
