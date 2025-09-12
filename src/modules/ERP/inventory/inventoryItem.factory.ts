import { PricingType } from 'src/utils/pricingType'
import { Product } from '../product/product'
import { InventoryItem, inventoryItemProps } from './inventoryItem'
import Decimal from 'decimal.js'
import { MeasuringUnit } from 'src/utils/measuringUnit'
import { makeProduct } from '../product/productFactory'

const cocaLata: Product = makeProduct({
  barcode: '7894900010015',
  name: '_Coca cola lata',
  description: '',
  price: Decimal('3.49'),
  measuringUnit: MeasuringUnit.mililiter('350'),
  pricingType: PricingType.UNITARY,
})

export const makeInventoryItem = (
  props: Partial<inventoryItemProps>,
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
