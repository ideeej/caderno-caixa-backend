import { PricingType } from 'src/utils/pricingType'
import { ProductProps } from '../product/product'
import { InventoryItem, inventoryItemProps } from './inventoryItem'
import Decimal from 'decimal.js'
import { MeasuringUnit } from 'src/utils/measuringUnit'

const cocaLataProps: ProductProps = {
  barcode: '7894900010015',
  name: '_Coca cola lata',
  description: '',
  price: Decimal('3.49'),
  measuringUnit: MeasuringUnit.mililiter('350'),
  pricingType: PricingType.UNITARY,
}

export const makeInventoryItem = (
  props: Partial<inventoryItemProps>,
  id?: string
) => {
  return new InventoryItem(
    {
      product: props.product ?? cocaLataProps,
      quantity: props.quantity ?? 1,
    },
    id
  )
}
