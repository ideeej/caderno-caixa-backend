import { MeasuringUnit } from 'src/utils/measuringUnit'
import { makeProduct } from '../product/productFactory'
import { makeCatalog } from './catalogFactory'
import Decimal from 'decimal.js'
import { PricingType } from 'src/utils/pricingType'

describe('Domain Catalog', () => {
  describe('Core', () => {
    let testCatalog

    beforeEach(() => {
      testCatalog = makeCatalog({})
    })

    test('Creates an empty catalog', () => {
      expect(testCatalog.products).toEqual([])
    })
  })
  describe('Products', () => {
    let testCatalog

    beforeEach(() => {
      testCatalog = makeCatalog({})
    })

    test('AddProduct should add one product to the catalog.', () => {
      const testProduct = makeProduct({})

      testCatalog.addProduct(testProduct)

      expect(testCatalog.products).toEqual([testProduct])
    })

    test('AddProducts should add more than one product to the catalog.', () => {
      const products = [makeProduct({}), makeProduct({}), makeProduct({})]

      testCatalog.addProducts(products)

      expect(testCatalog.products).toEqual([...products])
    })

    test('editProduct should edit one product from the catalog', () => {
      const CocaLata = makeProduct({
        barcode: '7894900010015',
        name: 'Coca cola lata',
        description: '',
        price: Decimal('3.49'),
        measuringUnit: MeasuringUnit.mililiter('350'),
        pricingType: PricingType.UNITARY,
      })

      const CocaPetProps = {
        barcode: '7894900011609',
        name: 'Coca cola pet 600ml',
        description: '',
        price: Decimal('6.99'),
        measuringUnit: MeasuringUnit.mililiter('600'),
        pricingType: PricingType.UNITARY,
      }

      testCatalog.addProduct(CocaLata)

      testCatalog.editProduct(CocaLata.id, CocaPetProps)

      const testCocaPet = testCatalog.getProduct(CocaLata.id)

      expect(testCocaPet.barcode).toBe(CocaPetProps.barcode)
      expect(testCocaPet.name).toBe(CocaPetProps.name)
      expect(testCocaPet.description).toBe(CocaPetProps.description)
      expect(testCocaPet.price).toBe(CocaPetProps.price)
      expect(testCocaPet.measuringUnit).toBe(CocaPetProps.measuringUnit)
      expect(testCocaPet.pricingType).toBe(CocaPetProps.pricingType)
    })

    test('removeProduct should remove one product from the catalog.', () => {
      const testProduct = makeProduct({})

      testCatalog.addProduct(testProduct)
      testCatalog.removeProduct(testProduct.id)
      expect(testCatalog.products).toEqual([])
    })
  })
})
