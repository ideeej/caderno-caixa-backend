import { PricingType } from 'src/utils/PricingType'
import { Product } from '../Product/Product'
import { InventoryItem, InventoryItemProps } from './InventoryItem'
import { MeasuringUnit } from 'src/modules/ERP/MeasuringUnit/MeasuringUnit'
import { makeProduct } from '../Product/Product.factory'
import { Barcode } from '../Barcode/Barcode'
import { Money } from '../Money/Money'

const cocaLata: Product = makeProduct({
  barcode: new Barcode('7894900010015'),
  name: '_Coca cola lata',
  description: '',
  price: new Money('3.49'),
  measure: MeasuringUnit.mililiter('350'),
  pricingType: PricingType.UNITARY,
})

export const makeInventoryItem = (props: Partial<InventoryItemProps>) => {
  if (!props.productBarcode) {
    throw new Error('Failed to Make inventory item')
  }

  return new InventoryItem({
    productBarcode: props.productBarcode ?? cocaLata.barcode,
    quantity: props.quantity ?? 1,
  })
}
