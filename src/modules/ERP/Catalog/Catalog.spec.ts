import { Catalog } from './Catalog'
import { Product } from '../Product/Product'
import { makeProduct } from '../Product/Product.factory'
import { makeCatalog } from './Catalog.factory'
import { MeasuringUnit } from 'src/utils/MeasuringUnit'
import { PricingType } from 'src/utils/PricingType'
import Decimal from 'decimal.js'

describe('Domain Catalog', () => {
  let catalog: Catalog
  let product1: Product
  let product2: Product

  beforeEach(() => {
    catalog = makeCatalog()

    product1 = makeProduct({
      barcode: '7894900010015',
      name: 'Coca Cola Lata',
      description: 'Refrigerante 350ml',
      price: new Decimal('3.49'),
      measuringUnit: MeasuringUnit.mililiter('350'),
      pricingType: PricingType.UNITARY,
    })

    product2 = makeProduct({
      barcode: '7891910000197',
      name: 'Guaraná Antarctica',
      description: 'Refrigerante 350ml',
      price: new Decimal('3.29'),
      measuringUnit: MeasuringUnit.mililiter('350'),
      pricingType: PricingType.UNITARY,
    })
  })

  describe('Factory', () => {
    test('should create empty catalog with factory', () => {
      const emptyCatalog = makeCatalog()
      expect(emptyCatalog.products).toHaveLength(0)
    })

    test('should create catalog with initial products', () => {
      const productsMap = new Map<string, Product>()
      productsMap.set(product1.id, product1)

      const catalogWithProducts = makeCatalog({ products: productsMap })
      expect(catalogWithProducts.products).toHaveLength(1)
      expect(catalogWithProducts.getProduct(product1.id)).toEqual(product1)
    })

    test('should create catalog with custom id', () => {
      const customId = 'custom-id-123'
      const catalogWithId = makeCatalog({}, customId)
      expect(catalogWithId.id).toBe(customId)
    })
  })

  describe('Core Operations', () => {
    test('should create an empty catalog', () => {
      expect(catalog.products).toHaveLength(0)
    })

    test('should add a product', () => {
      catalog.addProduct(product1)
      expect(catalog.products).toHaveLength(1)
      expect(catalog.getProduct(product1.id)).toEqual(product1)
    })

    test('should add multiple products', () => {
      catalog.addProducts([product1, product2])
      expect(catalog.products).toHaveLength(2)
    })

    test('should not add duplicate product ID', () => {
      catalog.addProduct(product1)
      expect(() => catalog.addProduct(product1)).toThrow(
        'Produto já existe no catálogo'
      )
    })

    test('should not add duplicate barcode', () => {
      catalog.addProduct(product1)
      const duplicateBarcode = makeProduct({
        ...product2.toProps(),
        barcode: product1.barcode,
      })
      expect(() => catalog.addProduct(duplicateBarcode)).toThrow(
        'Já existe um produto com este código de barras'
      )
    })
  })

  describe('Search and Retrieval', () => {
    beforeEach(() => {
      catalog.addProducts([product1, product2])
    })

    test('should get product by ID', () => {
      const found = catalog.getProduct(product1.id)
      expect(found).toEqual(product1)
    })

    test('should get product by barcode', () => {
      const found = catalog.getProductByBarcode(product1.barcode)
      expect(found).toEqual(product1)
    })

    test('should search products by name', () => {
      const results = catalog.searchProducts({ name: 'coca' })
      expect(results).toHaveLength(1)
      expect(results[0]).toEqual(product1)
    })

    test('should search products by price range', () => {
      const results = catalog.searchProducts({
        minPrice: new Decimal('3.00'),
        maxPrice: new Decimal('3.30'),
      })
      expect(results).toHaveLength(1)
      expect(results[0]).toEqual(product2)
    })
  })

  describe('Product Management', () => {
    test('should edit product', () => {
      catalog.addProduct(product1)
      const newProps = {
        ...product1.toProps(),
        price: new Decimal('3.99'),
        description: 'Nova descrição',
      }

      catalog.editProduct(product1.id, newProps)
      const updated = catalog.getProduct(product1.id)

      expect(updated?.price).toEqual(new Decimal('3.99'))
      expect(updated?.description).toBe('Nova descrição')
    })

    test('should not edit product with duplicate barcode', () => {
      catalog.addProducts([product1, product2])
      const newProps = {
        ...product2.toProps(),
        barcode: product1.barcode,
      }

      expect(() => catalog.editProduct(product2.id, newProps)).toThrow(
        'Código de barras já está em uso'
      )
    })

    test('should remove product', () => {
      catalog.addProduct(product1)
      catalog.removeProduct(product1.id)
      expect(catalog.getProduct(product1.id)).toBeNull()
    })
  })

  describe('Pagination', () => {
    beforeEach(() => {
      // Add 15 products for pagination testing
      const products = Array.from({ length: 15 }, (_, i) =>
        makeProduct({
          barcode: `78949000100${i.toString().padStart(2, '0')}`,
          name: `Product ${i + 1}`,
          description: 'Test product',
          price: new Decimal('1.99'),
          measuringUnit: MeasuringUnit.unit('1'),
          pricingType: PricingType.UNITARY,
        })
      )
      catalog.addProducts(products)
    })

    test('should paginate products list', () => {
      const page1 = catalog.listProducts(1, 10)
      const page2 = catalog.listProducts(2, 10)

      expect(page1.products).toHaveLength(10)
      expect(page2.products).toHaveLength(5)
      expect(page1.total).toBe(15)
      expect(page2.total).toBe(15)
    })
  })
})
