import Decimal from 'decimal.js'

import { makeProductProps } from 'src/modules/ERP/Product/Product.factory'
import { ProductProps } from 'src/modules/ERP/Product/Product'
import { SaleItem, SaleItemProps } from './SaleItem'

export const PRODUCT_TEST: ProductProps = makeProductProps({
  price: Decimal('2.99'),
})

export const saleItem = {
  productInfo: PRODUCT_TEST,
  quantity: Decimal('1'),
  total: Decimal('2.99'),
}

export const makeSaleItem = (props: Partial<SaleItemProps>, id?: string) => {
  return new SaleItem(
    {
      productInfo: { ...saleItem.productInfo },
      quantity: props.quantity ?? saleItem.quantity,
      total: props.total ?? saleItem.total,
      ...props,
    },
    id
  )
}
