import Decimal from 'decimal.js'
import { SaleUnit } from 'src/utils/saleUnit'

export interface ProductProps {
  barcode: string
  name: string
  description?: string

  price: Decimal
  saleUnit: SaleUnit
  unitValue: Decimal
}

export class Product {}
