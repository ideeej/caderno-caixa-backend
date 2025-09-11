import Decimal from 'decimal.js'
import { Product, ProductProps } from './product'
import { PricingType } from 'src/utils/pricingType'
import { MeasuringUnit } from 'src/utils/measuringUnit'

export const test_product: ProductProps = {
  barcode: '7894900010015',
  name: 'Coca cola lata',
  description: '',
  price: Decimal('3.99'),
  measuringUnit: MeasuringUnit.unit('1'),
  pricingType: PricingType.UNITARY,
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

export const makeProductProps = (
  props: Partial<ProductProps>
): ProductProps => {
  return {
    barcode: '7894900010015',
    name: 'Coca cola lata',
    description: '',
    price: Decimal('3.99'),
    measuringUnit: MeasuringUnit.unit('1'),
    pricingType: PricingType.UNITARY,
    ...props,
  }
}
