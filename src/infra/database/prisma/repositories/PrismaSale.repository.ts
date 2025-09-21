import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { SaleRepository } from 'src/modules/PDV/Sale/Sale.repository'
import { Sale } from 'src/modules/PDV/Sale/Sale'

@Injectable()
export class PrismaSaleRepository implements SaleRepository {
  constructor(private prisma: PrismaService) {}
  findById(id: string): Promise<Sale | null> {
    throw new Error('Method not implemented.')
  }
  save(sale: Sale): Promise<void> {
    throw new Error('Method not implemented.')
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
