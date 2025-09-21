import { Controller, Post, Get } from '@nestjs/common'
import { CreateSaleUseCase } from './useCases/createSale.usecase'
import { Sale } from './Sale'

@Controller('sales')
export class SaleController {
  constructor(private createSaleUseCase: CreateSaleUseCase) {}

  @Post()
  async createSale(): Promise<Sale> {
    return this.createSaleUseCase.execute()
  }
}
