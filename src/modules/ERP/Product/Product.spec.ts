import { Product } from './Product'
import { PricingType } from 'src/utils/PricingType'
import { MeasuringUnit } from '../MeasuringUnit/MeasuringUnit'

import { makeProduct } from './Product.factory'
import { makeMoney } from '../Money/Money.factory'
import { Barcode } from '../Barcode/Barcode'

describe('Product Domain', () => {
  describe('Core', () => {
    let product: Product
    beforeEach(() => {
      product = makeProduct({})
    })

    it('should be able to create a new Product', () => {
      expect(product).toBeInstanceOf(Product)
      expect(product.id).toBeTruthy()
      expect(product.name).toEqual('Coca cola lata')
      expect(product.description).toBe('')
      expect(product.barcode).toEqual(new Barcode('7894900010015'))
      expect(product.price).toEqual(makeMoney('3.99'))
      expect(product.pricingType).toBe(PricingType.UNITARY)

      const ml350 = MeasuringUnit.mililiter('350')
      expect(product.measure.code).toEqual(ml350.code)
      expect(product.measure.symbol).toEqual(ml350.symbol)
      expect(product.measure.description).toEqual(ml350.description)
      expect(product.measure.value).toEqual(ml350.value)
    })
  })
})
