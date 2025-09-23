import { IRepository } from 'src/utils/IRepository'
import { Sale } from './Sale'

export abstract class SaleRepository implements IRepository<Sale> {
  abstract findById(id: string): Promise<Sale | null>
  abstract save(sale: Sale): Promise<void>
  abstract delete(id: string): Promise<void>
}

export class FakeSaleRepository implements SaleRepository {
  public sales: Sale[] = []

  async findById(id: string): Promise<Sale | null> {
    const sale = this.sales.find(s => s.id === id)
    return sale || null
  }

  async save(sale: Sale): Promise<void> {
    const index = this.sales.findIndex(s => s.id === sale.id)

    if (index >= 0) {
      this.sales[index] = sale // Atualiza a venda
    } else {
      this.sales.push(sale) // Adiciona nova venda
    }
  }

  async delete(id: string): Promise<void> {
    this.sales = this.sales.filter(s => s.id !== id)
  }
}
