import { Module } from '@nestjs/common'
import { SaleController } from './Sale.controller'
import { CreateSaleUseCase } from './useCases/createSale.usecase'
import { SaleRepository, FakeSaleRepository } from './Sale.repository'

@Module({
  imports: [],
  controllers: [SaleController],
  providers: [
    CreateSaleUseCase,
    {
      provide: SaleRepository,
      useClass: FakeSaleRepository, // Diz ao Nest para usar a versão em memória
    },
  ],
})
export class SaleModule {}
