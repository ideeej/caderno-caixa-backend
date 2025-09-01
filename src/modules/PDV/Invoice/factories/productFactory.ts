import Decimal from 'decimal.js'
import { ProductItem, ProductItemProps } from 'src/utils/productItem'
import { Units } from 'src/utils/saleUnit'

export const test_product_id = 'test_product_id'

export const test_product: ProductItemProps = {
  barcode: '7891234500001',
  name: 'test_product_1',
  saleUnit: Units.UNITARY,
  price: Decimal('1'),
  unitValue: Decimal('1'),
}

export const makeProductItem = (
  props: Partial<ProductItemProps>,
  id?: string
) => {
  return new ProductItem(
    {
      ...test_product,
      ...props,
    },
    id ?? test_product_id
  )
}
