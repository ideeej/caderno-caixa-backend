import Decimal from 'decimal.js'
import { Product, ProductProps } from './product'
import { Units } from 'src/utils/saleUnit'

export const test_product: ProductProps = {
  barcode: '7891234500001',
  name: 'test_product_1',
  saleUnit: Units.UNITARY,
  price: Decimal('1'),
  unitValue: Decimal('1'),
}

export const makeProduct = (props: Partial<ProductProps>, id?: string) => {
  return new Product(
    {
      ...test_product,
      ...props,
    },
    id
  )
}
