import { NF, NFState, NFProps, NFType } from './NF'

export const NFID = 'NF_TEST_ID'

export const TEST_NF = {
  items: [],
  state: NFState.OPEN,
  type: NFType.CUSTOMER,
  openedAt: new Date(),
  closedAt: null,
}

export const makeNF = (props: Partial<NFProps>, id?: string) => {
  return new NF(
    {
      ...TEST_NF,
      items: [...TEST_NF.items],
      ...props,
    },
    id ?? NFID
  )
}
