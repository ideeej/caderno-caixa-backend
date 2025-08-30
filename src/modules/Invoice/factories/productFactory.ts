import Decimal from 'decimal.js'
import {
  ProductItem,
  ProductProps,
} from '../entities/InvoiceItem/entities/productItem'
import { SaleUnits } from 'src/utils/saleUnit'

export const test_product_id = 'test_product_id'

export const test_product: ProductProps = {
  barcode: '7891234500001',
  name: 'test_product_1',
  saleUnit: SaleUnits.UNIT,
  unitPrice: Decimal('1'),
  unitValue: Decimal('1'),
}

export const makeProductItem = (props: Partial<ProductProps>, id?: string) => {
  return new ProductItem(
    {
      ...test_product,
      ...props,
    },
    id ?? test_product_id
  )
}
