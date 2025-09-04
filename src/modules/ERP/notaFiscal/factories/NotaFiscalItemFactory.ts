import Decimal from 'decimal.js'
import { NotaFiscalItem } from '../entities/NotaFiscalItem'
import { Product } from '../../product/product'
import { makeProduct } from '../../product/productFactory'

export const testProduct: Product = makeProduct({})

export const testNotaFiscalItem = {
  product: testProduct,
  quantity: Decimal('1'),
}

export const makeNotaFiscalItem = (
  props: {
    product?: Product
    quantity?: Decimal
  },
  id?: string
) => {
  return new NotaFiscalItem(
    props.product ?? testNotaFiscalItem.product,
    props.quantity ?? testNotaFiscalItem.quantity,
    id
  )
}
