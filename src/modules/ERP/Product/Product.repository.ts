import { Product } from './Product'

export abstract class ProductRepository {
  abstract save(product: Product): Promise<Product>
  abstract update(id, updateData): Promise<void>
  abstract delete(id: string): Promise<void>

  abstract findById(id: string): Promise<Product | null>
  abstract findByBarcode(barcode: string): Promise<Product | null>
  abstract findAll(): Promise<Product[]>
  abstract findByName(name: string): Promise<Product[]>
}
