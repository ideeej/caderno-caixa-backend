import Decimal from 'decimal.js'

import { NFItem, NFItemProps } from './NFItem'
import { makeProduct } from 'src/modules/ERP/product/productFactory'
import { Product } from 'src/modules/ERP/product/product'

export const PRODUCT_TEST: Product = makeProduct({ price: Decimal('2.99') })

export const NFItem_TEST = {
  product: PRODUCT_TEST,
  quantity: Decimal('1'),
  total: Decimal('2.99'),
}

export const makeNFItem = (props: Partial<NFItemProps>, id?: string) => {
  return new NFItem(
    {
      product: props.product ?? NFItem_TEST.product,
      quantity: props.quantity ?? NFItem_TEST.quantity,
      total: props.total ?? NFItem_TEST.total,
    },
    id
  )
}
