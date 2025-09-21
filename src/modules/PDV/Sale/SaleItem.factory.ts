import { makeProductProps } from 'src/modules/ERP/Product/Product.factory'
import { ProductProps } from 'src/modules/ERP/Product/Product'
import { SaleItem, SaleItemProps } from './SaleItem'
import { Money } from 'src/modules/ERP/Money/Money'

export const PRODUCT_TEST: ProductProps = makeProductProps({
  price: new Money('2.99'),
})

export const saleItem = {
  productInfo: PRODUCT_TEST,
  quantity: 1,
  total: new Money('2.99'),
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
