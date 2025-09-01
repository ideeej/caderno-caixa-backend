import Decimal from 'decimal.js'
import { InvoiceItem } from '../entities/InvoiceItem/entities/invoiceItem'
import { ProductItem } from '../../../utils/productItem'
import { makeProductItem } from './productFactory'

export const testInvoiceItemId = 'test_invoice_item_id'
export const testProduct: ProductItem = makeProductItem({})

export const testInvoiceItem = {
  product: testProduct,
  quantity: Decimal('1'),
}

export const makeInvoiceItem = (
  props: {
    product?: ProductItem
    quantity?: Decimal
  },
  id?: string
) => {
  return new InvoiceItem(
    props.product ?? testInvoiceItem.product,
    props.quantity ?? testInvoiceItem.quantity,
    id ?? testInvoiceItemId
  )
}
