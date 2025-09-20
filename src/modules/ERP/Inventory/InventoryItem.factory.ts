import { PricingType } from 'src/utils/PricingType'
import { Product } from '../Product/Product'
import { InventoryItem, InventoryItemProps } from './InventoryItem'
import Decimal from 'decimal.js'
import { MeasuringUnit } from 'src/utils/MeasuringUnit'
import { makeProduct } from '../Product/Product.factory'

const cocaLata: Product = makeProduct({
  barcode: '7894900010015',
  name: '_Coca cola lata',
  description: '',
  price: Decimal('3.49'),
  measuringUnit: MeasuringUnit.mililiter('350'),
  pricingType: PricingType.UNITARY,
})

export const makeInventoryItem = (
  props: Partial<InventoryItemProps>,
  id?: string
) => {
  if (!props.product) {
    throw new Error('Failed to Make inventory item')
  }

  return new InventoryItem(
    {
      productId: props.productId ?? cocaLata.id,
      product: props.product ?? cocaLata.toProps(),
      quantity: props.quantity ?? 1,
    },
    id
  )
}
