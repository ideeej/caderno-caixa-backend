import { Product } from './Product'
import { ProductRepository } from './Product.repository'

export class ProductRepositoryFake implements ProductRepository {
  products: Map<string, Product> = new Map()

  async save(product: Product): Promise<Product> {
    const hasProduct = this.products.get(product.barcode)

    if (hasProduct) {
      throw new Error('Product already exists.')
    }

    this.products.set(product.barcode, product)
    return product
  }

  async update(id: any, updateData: any): Promise<void> {
    throw new Error('Method not implemented.')
  }
  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
  async findById(id: string): Promise<Product | null> {
    throw new Error('Method not implemented.')
  }
  async findByBarcode(barcode: string): Promise<Product | null> {
    throw new Error('Method not implemented.')
  }
  async findAll(): Promise<Product[]> {
    throw new Error('Method not implemented.')
  }
  async findByName(name: string): Promise<Product[]> {
    throw new Error('Method not implemented.')
  }
}
