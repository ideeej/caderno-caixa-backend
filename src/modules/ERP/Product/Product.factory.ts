import { Product, ProductProps } from './Product'
import { PricingType } from 'src/utils/PricingType'
import { MeasuringUnit } from 'src/modules/ERP/MeasuringUnit/MeasuringUnit'
import { Barcode } from '../Barcode/Barcode'
import { Money } from '../Money/Money'

export const test_product: ProductProps = {
  barcode: new Barcode('7894900010015'),
  name: 'Coca cola lata',
  description: '',
  price: new Money('3.99'),
  measure: MeasuringUnit.mililiter('350'),
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
    barcode: new Barcode('7894900010015'),
    name: 'Coca cola lata',
    description: '',
    price: new Money('3.99'),
    measure: MeasuringUnit.mililiter('300'),
    pricingType: PricingType.UNITARY,
    ...props,
  }
}
